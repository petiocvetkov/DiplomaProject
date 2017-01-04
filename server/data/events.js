var Event = require('mongoose').model("Event");



module.exports = {
  create: function (event,user,callback) {
      event.creator = user.username;
    Event.create(event,callback);
  },
  active: function (page,pageSize,filter,callback) {

      Event.find()
          .sort({
              date: 'desc'
          })
          .limit(pageSize)
          .skip((page - 1) * pageSize)
          .exec(function(err, foundEvents) {
              if (err) {
                  callback(err);
                  return;
              }

              Event.count().exec(function(err, numberOfEvents) {
                  var data = {
                      events: foundEvents,
                      currentPage: page,
                      pageSize: pageSize,
                      total: numberOfEvents
                  };
                  callback(err,data);
              });
          })
  }
}
