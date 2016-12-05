
var controllers = require('../controllers/controllers');
module.exports = function functionName(app) {
    app.get('/', function(req, res, next) {
        res.send("HELLO");
    });

    app.post('/users/register', controllers.users.postRegister);
};
