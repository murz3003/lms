import restify from 'restify';
import namespace from 'restify-namespace';
import jwt from 'jsonwebtoken';

import * as config from './config';
import * as database from './database';
import { User } from './models/user';

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
            return competitions.length ? competitions : database.createOpenCompetition();
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
        const promises = provider.getLeague(req.params.leagueSlug).concat(provider.getRound(req.params.leagueSlug, undefined, req.params.roundSlug));

        Promise.all(promises).then(data => {
            const fixtures = data[1].matches;
            delete data[1].matches;
            const response = {
                    league: data[0],
                    round: data[1],
                    fixtures
                };

            res.json(response);
        });
    });
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
