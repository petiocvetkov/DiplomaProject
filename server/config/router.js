
var controllers = require('../controllers/controllers');
module.exports = function (app) {
    app.get('/', function(req, res, next) {
        res.send("HELLO");
    });


    app.post('/events/create', controllers.events.postCreate);

    app.post('/users/register', controllers.users.postRegister);
};
