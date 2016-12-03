var express = require("express"),
    app = require('./server/config/express.js'),
    config = require('./server/config/config.js'),
    http = require('http');

app.server = http.createServer();

require('./server/config/mongoose')(config);

app.server.on('request', app);
app.server.listen(config.port);
console.log("Server is runnig on port: " + config.port);
