var users = require('../data/users.js');



module.exports = {
    postRegister: function (req, res, next) {
      console.log();
        var newUserData = req.body;
        console.log(newUserData);
        users.create(newUserData, function(err, user) {
            if (err) {
                if (err.code == 11000) {
                  console.log("hello man");
                    res.status(400);
                    return res.send({reason: "Failed to register duplicate username: " + newUserData.username});
                }

                console.log('Failed to register new user: ' + err);
                res.status(400);
                return res.send({reason: err.toString()});
            }
        });
    },
    postLogin:function (req, res, next) {
      var loginUser = req.body;
      console.log(loginUser);
      console.log("asd");

      users.find(req.body,function (err,user) {
        console.log(err);
      })

    }
};
