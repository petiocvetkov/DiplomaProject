var controllers = require('../controllers/controllers'),
    auth = require('./auth');
module.exports = function (app) {
    app.get('/', function(req, res, next) {
        res.render("index",{'currentUser':req.user});
    });

    app.get('/login',auth.isNotAuthenticated, controllers.users.getLogin);
    app.post('/login',auth.login);
    app.get('/logout', auth.logout);

    app.get('/register',auth.isNotAuthenticated, controllers.users.getRegister);
    app.post('/register', controllers.users.postRegister)

    app.post('/events/join',function (req,res) {
        console.log(req.body);
    })

    app.get('/events/create',auth.isAuthenticated, controllers.events.getCreate);
    app.post('/events/create',auth.isAuthenticated, controllers.events.postCreate);
    app.get('/events/active',auth.isAuthenticated, controllers.events.getActive);

    app.post('/users/register', controllers.users.postRegister);
};
