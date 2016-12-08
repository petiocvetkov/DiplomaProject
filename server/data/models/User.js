var mongoose = require('mongoose');



module.exports.init = function () {
    var userSchema = mongoose.Schema({
        username: {type: String, required: true, unique: true},
        password: String
    });


     mongoose.model("User", userSchema);
};
