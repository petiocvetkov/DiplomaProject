var users = require('../data/users.js'),
    encryption = require('../utils/encryption'),
    constants = require('../common/constants');


var CONTROLLER_NAME = 'users';




module.exports = {
    postRegister: function (req, res, next) {
        var newUserData = req.body;
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);

        users.create(newUserData, function(err, user) {
            if (err) {
                if (err.code == 11000) {
                    res.status(400);
                    console.log({reason: "Failed to register duplicate username: " + newUserData.username});
                    res.render("index",{
                        sports:constants.sports,
                        errorMessage:"Duplicate username or email"
                    });
                }

                console.log('Failed to register new user: ' + err);
                res.status(400);
                res.render('index',{
                    errorMessage: err.toString().split(':')[1],
                    sports: constants.sports
                });
            }

            req.logIn(user, function(err) {
                if (err) {
                    res.status(400);
                    return res.redirect('/register'); // TODO:
                }
                else {
                    res.redirect('/');
                }
            })
        });
    },
    getRegister:function (req,res,next) {
        var sports = constants.sports
        res.render(CONTROLLER_NAME + '/register',{
            sports: sports
        });
    },

    getLogin: function(req, res, next) {
        res.render(CONTROLLER_NAME + '/login');
    },
    deleteAlerts:function (user) {
        users.deleteAlerts(user);
    },
    getProfile: function (req,res,next) {
        users.profile(req.user,function (data) {
            res.render(CONTROLLER_NAME + '/profile',{
                'data' : data,
                'currentUser' : req.user
            })
        })
    }

};
