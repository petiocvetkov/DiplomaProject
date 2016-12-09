var Event = require('mongoose').model("Event");



module.exports = {
  create: function (event,callback) {
    Event.create(event,callback);

  }
}
