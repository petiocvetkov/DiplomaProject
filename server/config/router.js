var controllers = require('../controllers/controllers'),
    auth = require('./auth');
module.exports = function (app) {
    app.get('/', function(req, res, next) {
        res.render("index",{'currentUser':req.user});
    });

    app.get('/login', controllers.users.getLogin);
    app.post('/login',auth.login);
    app.get('/logout', auth.logout);

    app.get('/register', controllers.users.getRegister);
    app.post('/register', controllers.users.postRegister)



    app.get('/events/create',auth.isAuthenticated, controllers.events.getCreate);
    app.post('/events/create',auth.isAuthenticated, controllers.events.postCreate);
    app.get('/events/active',controlles.events.getActive);

    app.post('/users/register', controllers.users.postRegister);
};
