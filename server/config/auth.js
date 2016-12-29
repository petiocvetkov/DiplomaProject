var passport = require('passport');

module.exports = {
    login: function(req, res, next) {
        var auth = passport.authenticate('local', function(err, user) {
            if (err) return next(err);
            if (!user) {
                console.log({success: false}); // TODO:
            }

            req.logIn(user, function(err) {
                console.log("login")
                if (err) return next(err)
                res.redirect('/');
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
            res.redirect('/login');
        }
        else {
            next();
        }
    },
    isNotAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            next();
        }
    }
};