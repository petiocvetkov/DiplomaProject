var passport = require('passport'),
    controllers = require('../controllers/controllers');

module.exports = {
    login: function(req, res, next) {
        var auth = passport.authenticate('local', function(err, user) {
            if (err) return next(err);
            if (!user) {
                console.log({success: false}); // TODO:
            }

            req.logIn(user, function(err) {
                if (err) return next(err);
                res.redirect('/events/active');

            })
        });

        auth(req, res, next);
    },
    logout: function(req, res, next) {
        req.logout();
        res.redirect('/');
    },
    isAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            controllers.users.deleteAlerts(req.user.username,function () {
            });
            next();
        }
    },
    isNotAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/events/active');
        }
        else {
            next();
        }
    }
};