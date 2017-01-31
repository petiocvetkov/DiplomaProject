var controllers = require('../controllers/controllers'),
    auth = require('./auth'),
    sports = require('../common/constants').sports;
module.exports = function (app) {
    app.get('/',auth.isNotAuthenticated, function(req, res, next) {
        res.render("index",{'currentUser':req.user,
        'sports':sports});
    });

    app.get('/login',auth.isNotAuthenticated, controllers.users.getLogin);
    app.post('/login',auth.login);
    app.get('/logout', auth.logout);

    app.get('/register',auth.isNotAuthenticated, controllers.users.getRegister);
    app.post('/register', controllers.users.postRegister)

    app.post('/events/leave',auth.isAuthenticated,controllers.events.postLeave);
    app.post('/events/join',auth.isAuthenticated,controllers.events.postJoin);
    app.get('/events/details/:id',auth.isAuthenticated,controllers.events.getDetail);
    app.get('/events/edit/:id',auth.isAuthenticated,controllers.events.getEdit);
    app.post('/events/edit/:id',auth.isAuthenticated,controllers.events.postEdit);
    app.post('/events/delete/:id', auth.isAuthenticated , controllers.events.postDelete);
    app.get('/events/create',auth.isAuthenticated, controllers.events.getCreate);
    app.post('/events/create',auth.isAuthenticated, controllers.events.postCreate);
    app.get('/events/active',auth.isAuthenticated, controllers.events.getActive);

    app.post('/users/register', controllers.users.postRegister);
};
