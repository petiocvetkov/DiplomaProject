var User = require('mongoose').model('User'),
    Event = require('mongoose').model('Event');


module.exports = {
    create: function(user, callback) {
        User.create(user, callback);

    },
    find: function (user,callback) {
      User.findOne(user,function (err,user) {

      });
    },
    addAlert:function (event) {
        User.find({'favoriteSport': event.sport},function (err,users) {
            users.forEach(function (user) {
                if(user.alerts.length < 10 && event.creator != user.username){
                    user.alerts.push({
                        title:event.title,
                        id:event._id
                    });
                }
                user.save();
            })
        })
    },
    profile:function (user,callback) {
        var dataEvents,dataUser;
        User.findOne({'username': user.username},function (err,user) {
            Event.find({'sport':user.favoriteSport},function (err,events) {
                dataEvents = events.slice(0,3);
                var data = {
                    'user':user,
                    'events':dataEvents
                }
                callback(data);

            })
        });

    },
    deleteAlerts : function (user,callback) {
        User.findOne({'username' : user}, function (err,user) {
            user.alerts = [];
            user.save();
        })
    }
};

