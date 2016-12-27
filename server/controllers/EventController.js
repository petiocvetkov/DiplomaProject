var events = require('../data/events'),
    constants = require('../common/constants');


var CONTROLLER_NAME = 'events';


module.exports = {
  postCreate: function (req,res,next) {
      var event = req.body;

      events.create(event,function (err,event) {
          if (err){
            console.log(err);
          }
          else {
            console.log("created");
            res.send(event);
          }
      })
  },
  getCreate: function (req,res,next) {
      res.render(CONTROLLER_NAME + '/create', {sports: constants.sports,
      currentUser:req.user});
      },

   getActive: function () {
       var page = req.query.page || 1;
       var pageSize = req.query.pageSize || 10;

       // TODO: get user initatives and season + 'Public' + 'None'

       events.active(page, pageSize, function(err, data) {
           res.render(CONTROLLER_NAME + '/active', {
               data: data
           });
       });
    }
}
