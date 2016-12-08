var User = require('mongoose').model('User');


module.exports = {
    create: function(user, callback) {
        User.create(user, callback);
    },
    find: function (user,callback) {
      User.findOne(user,callback);
    }
};
