var events = require('../data/events');


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
  }
}
