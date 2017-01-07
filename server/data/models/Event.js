var mongoose = require('mongoose');

var requiredMessage = '{PATH} is required';


module.exports.init = function () {
      var eventSchema = mongoose.Schema({
        title: { type: String, required: requiredMessage},
        description: {type: String, required: requiredMessage},
        sport:{type: String, required: requiredMessage},
        //date:{type: Date, required: requiredMessage},
        creator:{type: String, required: requiredMessage},
        location:{type: String, required:requiredMessage},
        members:[String],
        comments:[{
          username:String,
          content:String
        }]
      });

    mongoose.model("Event",eventSchema);
}
