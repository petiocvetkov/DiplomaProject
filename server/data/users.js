var User = require('mongoose').model('User'),
    Event = require('mongoose').model('Event');


module.exports = {
    create: function(user, callback) {
        User.create(user, callback);

    },
    find: function (user,callback) {
      User.findOne(user,callback);
    },
    addAlert:function (event) {
        User.find({'favoriteSport': event.sport},function (err,users) {
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
    },
    deleteAlerts:function (user) {
        User.findOne(user,function (err,user) {
            user.alerts = [];
            user.save();
        })
    },
    profile:function (user,callback) {
        var dataEvents,dataUser;
        User.findOne({'username': user.username},function (err,user) {
            Event.find({'sport':user.favoriteSport},function (err,events) {
                dataEvents = events;
                var data = {
                    'user':user,
                    'events':events
                }
                console.log(data);
                callback(data);

            })
        });

    }
};

