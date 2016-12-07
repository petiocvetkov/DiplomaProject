var User = require('mongoose').model('User');

console.log('ASDASDASDSDASD');

module.exports = {
    create: function(user, callback) {
        User.create(user, callback);
    }
};
