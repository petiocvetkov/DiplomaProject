var events = require('../data/events'),
    constants = require('../common/constants');


var CONTROLLER_NAME = 'events';


module.exports = {
  postCreate: function (req,res,next) {
      var event = req.body;

      events.create(event,req.user , function (err,event) {
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

   getActive: function (req,res,next) {
       var page = parseInt(req.query.page) || 1;
       var pageSize = parseInt(req.query.pageSize) || 10;
       var filter = req.query.filter || 0;

       console.log(page);
       console.log(pageSize);

        //console.log("1");
       events.active(page, pageSize,filter, function(err, data) {
           res.render(CONTROLLER_NAME + '/active', {
               data: data,
               currentUser:req.user
           });
       });
    }
}
