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
                    console.log(err);
                    res.render("index",{
                        sports:constants.sports,
                        errorMessage:"Duplicate username or email"
                    });
                }

                console.log('Failed to register new user: ' + err);
                res.status(400);
                console.log(err.toString());
                res.render('index',{
                    errorMessage: err.toString(),
                    sports: constants.sports
                });
            }
            console.log("created");
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
    }

};
