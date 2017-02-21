var restify = require('restify'),
    server = restify.createServer();

server.get('/api/competitions', function (req, res, next) {
    res.send([{
        title: 'Competition 1'
    }]);
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
