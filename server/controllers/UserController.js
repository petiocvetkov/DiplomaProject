var users = require('../data/users.js'),
    encryption = require('../utils/encryption');

var CONTROLLER_NAME = 'users';




module.exports = {
    postRegister: function (req, res, next) {
      console.log();
        var newUserData = req.body;
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);

        console.log(newUserData);
        users.create(newUserData, function(err, user) {
            if (err) {
                if (err.code == 11000) {
                    res.status(400);
                    return res.send({reason: "Failed to register duplicate username: " + newUserData.username});
                }

                console.log('Failed to register new user: ' + err);
                res.status(400);
                return res.send({reason: err.toString()});
            }
            res.send(req.body);
        });
    },

    getLogin: function(req, res, next) {
        res.render(CONTROLLER_NAME + '/login');
    }
};
