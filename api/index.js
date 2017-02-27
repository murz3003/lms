var restify = require('restify'),
    server = restify.createServer();

// Temporary hard code data to save api calls
var leagues = require('../data/leagues'),
	rounds = require('../data/rounds.json');

// Hard code a competition until a model exists
var competition = {
		league: leagues[4],
		round: rounds[25]
	};

server.get('/api/competitions', function (req, res, next) {
    res.send({
		entered: [], // Only when logged in
		available: [competition],
		ended: [] // Only when logged in
	});
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
