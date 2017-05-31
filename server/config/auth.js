var passport = require('passport'),
    controllers = require('../controllers/controllers'),
    sports = require('../common/constants').sports;

module.exports = {
    login: function(req, res, next) {
        var auth = passport.authenticate('local', function(err, user) {
            if (err) return next(err);
            if (!user) {
                console.log({success: false}); // TODO:
                res.render("index", {"loginError" : "Account not found",
                    'sports':sports})
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