var mongoose = require('mongoose')



module.exports.init = function () {
    var userSchema = mongoose.Schema({
        username: {type: String, required: true, unique: true},
        hashPass: String,
        salt: String
    });


    var User = mongoose.model("User", userSchema);
};
