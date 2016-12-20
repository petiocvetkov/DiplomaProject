var controllers = require('../controllers/controllers'),
    auth = require('./auth');
module.exports = function (app) {
    app.get('/', function(req, res, next) {
        res.send("HELLO");
    });

    app.get('/login', controllers.users.getLogin);
    app.post('/login',auth.login);
    app.get('/logout', auth.logout);



    app.post('/events/create', controllers.events.postCreate);

    app.post('/users/register', controllers.users.postRegister);
};
