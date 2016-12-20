var mongoose = require('mongoose'),
    encryption = require('../../utils/encryption');
;



module.exports.init = function () {
    var userSchema = mongoose.Schema({
        username: {type: String, required: true, unique: true},
        hashPass: String,
        salt: String
        });
    userSchema.method({
        authenticate: function (password) {
            if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
                return true;
            }
            else {
                return false;
            }
        }
    });


     mongoose.model("User", userSchema);
};
