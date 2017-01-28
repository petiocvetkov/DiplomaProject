var User = require('mongoose').model('User');


module.exports = {
    create: function(user, callback) {
        User.create(user, callback);

    },
    find: function (user,callback) {
      User.findOne(user,callback);
    },
    addAlert:function (event,callback) {

        User.find({'favoriteSport':event.sport},function (err,users) {
            users.forEach(function (user) {
                if(user.alerts.length < 10){
                    user.alerts.push({
                        title:event.title,
                        id:event._id
                    });
                }
                user.save();
            })
        })
    }
};
