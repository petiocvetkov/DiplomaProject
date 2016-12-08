
var controllers = require('../controllers/controllers');
module.exports = function (app) {
    app.get('/', function(req, res, next) {
        res.send("HELLO");
    });

    app.post('/users/register', controllers.users.postRegister);
    app.post('/users/login', controllers.users.postLogin)
};
