var mongoose = require('mongoose'),

exports.init = function () {
    var userSchema = mongoose.Schema({
        username: {type: String, required: true, unique: true},
        password:String
    });


    var User = mongoose.model("User", userSchema);
};
