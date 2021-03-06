import path from 'path';
import restify from 'restify';
import namespace from 'restify-namespace';
import jwt from 'jsonwebtoken';

import * as config from './config';
import * as database from './database';
import { User } from './models/user';

const provider = require(path.resolve(__dirname, config.provider.name));
const server = restify.createServer();
const requiresAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send(401);
    }
}

// Hard code a competition until a model exists
var enteredCompetition = {
            entered: true,
            pickedTeam: false,
            streak: 4,
            players: {
                entered: 15,
                remaining: 7
            }
        },
    availableCompetition = {
            entered: true,
            pickedTeam: false,
            players: {
                entered: 15,
                remaining: 15
            }
        };

server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use(function (req, res, next) {
    req.isAuthenticated = function () {
        const auth = req.headers.authorization || '';
        const token = auth.split(' ');

        if (token[0] === 'Bearer') {
            try {
                req.user = jwt.verify(token[1], config.auth.jwt.secretOrKey);

                return true;
            } catch(err) {
                return false;
            }
        }

        return false;
    };

    next();
});

server.get('/profile', requiresAuthentication, function (req, res, next) {
    User.findById({ _id: req.user._id }, function (err, user) {
        if (err) {
            res.json(500, err);
        }

        res.json({ user });
    });
});

server.post('/auth/google', function (req, res, next) {
    const body = JSON.parse(req.body);
    const data = {
        accessToken: body.accessToken,
        firstName: body.profileObj.givenName,
        lastName: body.profileObj.familyName,
        emails: [body.profileObj.email],
        google: body.profileObj
    };

    User.findOrCreate({ 'google.googleId': body.googleId }, data, function (err, user) {
        if (err) {
            res.json(500, err);
        }

        const token = jwt.sign(user.toJSON(), config.auth.jwt.secretOrKey);

        res.json({ user, token });
    });
});

namespace(server, '/api', function () {
    server.get('/competitions', function (req, res, next) {
        const user = req.isAuthenticated() ? req.user : null;

        database.getOpenCompetitions().then(competitions => {
            if (competitions.length !== config.leagues.length) {
                const competitionLeagues = competitions.map(competition => competition.league.league_slug);
                const difference = config.leagues.filter(league => !competitionLeagues.includes(league));
                const promises = difference.map(league => database.createOpenCompetition(league));

                return Promise.all(promises).then(newCompetitions => competitions.concat(newCompetitions));
            } else {
                return competitions;
            }
        }).then(competitions => {
            const response = {
                    entered: user ? [] : [], // Only when logged in
                    available: competitions,
                    ended: [] // Only when logged in
                };

            res.json(response);
        });
    });

    server.get('/competitions/:leagueSlug/:roundSlug', function (req, res, next) {
        const league = req.params.leagueSlug;
        const round = req.params.roundSlug.split('round-')[1];

        database.getCompetition(league, round).then(competition => {
            provider.getRound(league, competition.round.current).then(round => {
                const response = {
                        competition,
                        round
                    };

                res.json(response);
            });
        });
    });
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
