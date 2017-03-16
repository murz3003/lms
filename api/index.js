import path from 'path';
import restify from 'restify';

import { provider as providerName } from './config';

const provider = require(path.resolve(__dirname, providerName));
const server = restify.createServer();

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

server.get('/api/competitions', function (req, res, next) {
    const promises = provider.getLeague().concat(provider.getRounds());
    const now = new Date().toISOString();

    Promise.all(promises).then(data => {
        return {
            league: data[0],
            round: data[1].find((round, i, arr) => {
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
        const response = {
                league: data[0],
                round: data[1]
            };

        res.send(response);
    });
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
