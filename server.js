var
    config = require('./server/config/config.js'),
    app = require('./server/config/express')(config);



require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/router')(app);


app.listen(config.port);
console.log("Server is runnig on port: " + config.port);
