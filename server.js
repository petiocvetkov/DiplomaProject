var
    app = require('./server/config/express')(),
    config = require('./server/config/config.js');



require('./server/config/mongoose')(config);
require('./server/config/router')(app);


app.listen(config.port);
console.log("Server is runnig on port: " + config.port);
