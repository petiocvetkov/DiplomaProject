var Event = require('mongoose').model("Event");


module.exports = {
    create: function (event, user, callback) {
        event.creator = user.username;
        event.members = [];
        event.members.push(user.username);
        Event.create(event, callback);
    },
    active: function (page, pageSize, filter, callback) {

        Event.find()
            .sort({
                date: 'desc'
            })
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .exec(function (err, foundEvents) {
                if (err) {
                    callback(err);
                    return;
                }

                Event.count().exec(function (err, numberOfEvents) {
                    var data = {
                        events: foundEvents,
                        currentPage: page,
                        pageSize: pageSize,
                        total: numberOfEvents
                    };
                    callback(err, data);
                });
            })
    },

    join: function (event_id, username, callback) {
        Event.findOne({'_id': event_id}).exec(
            function (err, event) {
                if (!(event.members.indexOf(username) > -1)) {
                    event.members.push(username)
                    event.save();
                }
                else {
                    console.log("nope")
                }
            });
    },
    detail: function (id, callback) {
        Event.findOne({'_id': id}, function (err, event) {
            callback(err, event);
        })

    },
    leave: function (event_id, username, callback) {
        Event.findOne({'_id': event_id}).exec(
            function (err, event) {
                console.log(event.members.indexOf(username));
                event.members.splice(event.members.indexOf(username),1);
                console.log(event);

                event.save();
                callback();
            });
    }

}
