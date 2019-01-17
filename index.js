/**
 * Pirple Node Js course first Assignment
 * by Saviobosco (Omebe Johnbosco)
 * This is a basic node application with only one route 
 * /hello that return a greeting message 
 */

var http = require('http');
var url = require('url');
var stringDecoder = require('string_decoder').StringDecoder;


var config = {
    port : 4100
};

var server = http.createServer(function(req, res) {
    // Get the url and parse it 
    var parsedUrl = url.parse(req.url, true);

    // Get the path 
    var path = parsedUrl.pathname;

    var trimmedPath = path.replace(/^\/+|\/+$/g, '')

    //Get the payload
    var decoder = new stringDecoder('utf-8');
    var buffer = '';
    req.on('data', function(data) {
        buffer += decoder.write(data);
    });
    req.on('end', function() {
        buffer += decoder.end();

        // Choose the request handler, if not found us not found handler
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : requestsHandler.notFound;

        var data = {
            'payload' : buffer
        };

        // Route the request to the specified handler
        chosenHandler(data, function(statusCode, payload) {
            //Use the default
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            //payload
            payload = typeof(payload) == 'object' ? payload : {};

            // convert payload to string
            var payloadString = JSON.stringify(payload);

            //returning content type
            res.setHeader('Content-Type', 'application/json')
            // return response
            res.writeHead(statusCode);

            res.end(payloadString);

        });

    });

});

server.listen(config.port, function() {
    console.log('Server listening on port ' + config.port);
});

requestsHandler = {};

requestsHandler.hello = function(data, callback) {
    callback(200, {"message" : "Hello dear, Isn't it such a beautiful time to be alive ? (:-" });
}
requestsHandler.notFound = function(data, callback) {
    callback(404);
};

var router = {
    'hello' : requestsHandler.hello
}