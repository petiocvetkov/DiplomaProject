var mongoose = require('mongoose'),
    encryption = require('../../utils/encryption');

var requiredMessage = '{PATH} is required';



module.exports.init = function () {
    var userSchema = mongoose.Schema({
        email: { type: String, required: requiredMessage, unique:true},
        username: {type: String, required: requiredMessage, unique: true},
        hashPass: String,
        salt: String,
        favoriteSport:{type: String, required:requiredMessage},
        alerts:[{title:String,
        id:String
        }],
        firstName:  { type: String, required: requiredMessage},
        lastName:  { type: String, required: requiredMessage}
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
