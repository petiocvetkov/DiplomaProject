var mongoose = require('mongoose');

module.exports.init = function () {
      var eventSchema = mongoose.Schema({
        title: {type: String, required: true},
        description: {type: String, required: true},
        //sport:{type: String, required: true},
        //date:{type: Date, required: true},
        //creator:{type: String, required: true},
        comments:[{
          username:String,
          content:String
        }]
      });

    mongoose.model("Event",eventSchema);
}
