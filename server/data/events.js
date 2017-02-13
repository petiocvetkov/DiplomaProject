var Event = require('mongoose').model("Event"),
    users = require('./users');


module.exports = {
    create: function (event, user, callback) {
        event.creator = user.username;
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
                        total: parseInt((numberOfEvents + pageSize - 1)) / pageSize
                    };
                    users.deleteAlerts();
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
            });
    },
    detail: function (event_id, callback) {
        Event.findOne({'_id': event_id}, function (err, event) {
            callback(err, event);
        })

    },
    leave: function (event_id, username, callback) {
        Event.findOne({'_id': event_id}).exec(
            function (err, event) {
                console.log(event.members.indexOf(username));
                event.members.splice(event.members.indexOf(username), 1);

                event.save();
                callback();
            });
    },
    edit: function (event_id, event_edit, user, callback) {
        Event.findOne({'_id': event_id}).exec(
            function (err, event) {
                event.title = event_edit.title;
                event.description = event_edit.description;
                event.location = event_edit.location;
                event.sport = event_edit.sport;
                event.save();
                callback(event, err);

            }
        )
    },
    delete: function (event_id, callback) {
        Event.findOneAndRemove({'_id': event_id}, function (err) {
            callback(err);
        });
    },
    addComment: function (event_id, comment, callback) {
        Event.findOne({'_id': event_id}, function (err, event) {
                console.log(event)
                event.comments.push(comment);
                event.save();
                callback(event);
            }
        );
    }

}
