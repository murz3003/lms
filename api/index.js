var restify = require('restify'),
    server = restify.createServer();

// Temporary hard code data to save api calls
var leagues = require('../data/leagues'),
    rounds = require('../data/rounds.json');

// Hard code a competition until a model exists
var enteredCompetitions = [
        {
            league: leagues[4],
            round: rounds[25],
            entered: true,
            pickedTeam: false,
            streak: 4,
            players: {
                entered: 15,
                remaining: 7
            }
        }
    ],
    availableCompetitions = [
        {
            league: leagues[4],
            round: rounds[26],
            entered: true,
            pickedTeam: false,
            players: {
                entered: 15,
                remaining: 15
            }
        },
        {
            league: leagues[4],
            round: rounds[26],
            entered: false,
            pickedTeam: false,
            players: {
                entered: 22,
                remaining: 22
            }
        }
    ];

server.get('/api/competitions', function (req, res, next) {
    res.send({
        entered: enteredCompetitions, // Only when logged in
        available: availableCompetitions,
        ended: [] // Only when logged in
    });
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
