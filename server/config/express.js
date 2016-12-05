var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),


module = function() {
    app.use(express.static(__dirname + "/"));
    app.use(bodyParser.json());


    return app;
};
