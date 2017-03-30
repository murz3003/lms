import path from 'path';
import restify from 'restify';
import mongoose from 'mongoose';
import passport from 'passport-restify';
import jwt from 'jsonwebtoken';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

import * as config from './config';
import { User } from './models/user';

const server = restify.createServer();
const provider = require(path.resolve(__dirname, config.provider.name));
const db = mongoose.connect(config.db.url);

passport.use(new JwtStrategy({
        ...config.auth.jwt,
        jwtFromRequest: ExtractJwt.fromExtractors([
            ExtractJwt.fromAuthHeader(),
            ExtractJwt.fromUrlQueryParameter('access_token')
        ])
    }, function (payload, done) {
        debugger;
        User.findById(payload, function (err, user) {
            debugger;
            if (err) {
                return done(err);
            }

            return done(null, user || null);
        });
    }));
passport.use(new GoogleStrategy(config.auth.google, function (token, refreshToken, profile, done) {
    debugger;
    User.findOne({ 'google.id': profile.id }, function (err, user) {
        debugger;
        if (err) {
            return done(err);
        }

        if (!user) {
            const newUser = new User();

            newUser.google = { id: profile.id, name: profile.displayName, email: profile.emails[0].value };

            newUser.save(function (err, user) {
                done(err, user, token);
            });
        } else {
            // if (user.google.token !== token) {
            //     user.google.token = token;
            //
            //     user.save(function (err, user) {
            //         done(err, user);
            //     });
            // } else {
                done(null, user, token);
            // }
        }
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

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
server.use(passport.initialize());

function isAuthenticated(req, res, next) {
    debugger;
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/', next);
}

server.post('/auth/google', function (req, res, next) {
    debugger;
    res.json({
        user: {
            name: 'dav',
            age: 31
        }
    });
});
server.get('/auth/google', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }));
server.get('/auth/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/' }),
    function (req, res, next) {
        debugger;
        // const access_token = req.user.access_token;
        const access_token = jwt.sign(req.authInfo, config.auth.jwt.secretOrKey);

        res.redirect({
            pathname: '/api/competitions',
            query: { access_token }
        }, next);
    });

server.use(function (req, res, next) {
    debugger;
    passport.authenticate('jwt', { session: false }, function (err, user, info) {
        debugger;
        if (user) {
            req.user = user
        }
        next();
    })(req, res, next);
});
server.get('/api/competitions', function (req, res, next) {
    debugger;
    const user = req.isAuthenticated() ? req.user : null;
    const promises = provider.getLeague().concat(provider.getRounds());
    const now = new Date().toISOString();

    Promise.all(promises).then(data => {
        return {
            league: data[0],
            round: data[1].find(round => {
                const date = new Date(round.start_date).toISOString();
                return date > now;
            })
        };
    }).then(data => {
        const response = {
                entered: [{...enteredCompetition, ...data}], // Only when logged in
                available: [{...availableCompetition, ...data}],
                ended: [] // Only when logged in
            };

        res.send(response);
    });
});

server.get('/api/competitions/:leagueSlug/:roundSlug', function (req, res, next) {
    const promises = provider.getLeague(req.params.leagueSlug).concat(provider.getRound(req.params.leagueSlug, undefined, req.params.roundSlug));

    Promise.all(promises).then(data => {
        const fixtures = data[1].matches;
        delete data[1].matches;
        const response = {
                league: data[0],
                round: data[1],
                fixtures
            };

        res.send(response);
    });
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
