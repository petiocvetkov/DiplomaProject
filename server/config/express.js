var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');


module.exports = function() {
    app.use(express.static(__dirname + "/"));
    app.use(bodyParser.json());

    return app;
};
