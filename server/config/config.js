var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    rootPath: rootPath,

    db: "mongodb://social_network:socialnetwork@ds119608.mlab.com:19608/social_network_db"
,
    port: process.env.PORT || 3000
};
