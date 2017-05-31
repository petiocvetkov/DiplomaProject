var events = require('../data/events'),
    users = require('../data/users'),
    constants = require('../common/constants');


var CONTROLLER_NAME = 'events';


module.exports = {
    postCreate: function (req, res, next) {
        var event = req.body;
        console.log(event);

        events.create(event, req.user, function (err, event) {
            if (err) {
                res.render(CONTROLLER_NAME + "/create",{"errorMessage" : err.message,
                "currentUser" : req.user,
                "sports" : constants.sports});
                console.log(err);
            }
            else {
                res.redirect("/" + CONTROLLER_NAME + "/details/" + event._id);
                users.addAlert(event);
            }

        })

    },
    getCreate: function (req, res, next) {
        res.render(CONTROLLER_NAME + '/create', {
            sports: constants.sports,
            currentUser: req.user
        });
    },

    getActive: function (req, res, next) {
        var page = parseInt(req.query.page) || 1;
        var pageSize = parseInt(req.query.pageSize) || 10;
        var filter = req.query.filter || 0;


        events.active(page, pageSize, filter, function (err, data) {
            res.render(CONTROLLER_NAME + '/active', {
                data: data,
                currentUser: req.user
            });
        });
    },

    postJoin: function (req, res, next) {
        events.join(req.body.id, req.user.username, function (err) {

        });
    },
    getDetail: function (req, res, next) {

        events.detail(req.params.id, function (err, data){
            if(err || data == null){
                res.redirect('/detail/active');
            }else {
                res.render(CONTROLLER_NAME + '/detail', {
                    'event': data,
                    'currentUser': req.user
                });
            }
        })
    },
    postLeave: function (req, res, next) {
        events.leave(req.body.id, req.user.username, function () {
            res.status(200);
            res.send(req.user.username);
        })
    },
    getEdit: function (req, res, next) {
        events.detail(req.params.id, function (err, event) {
            if (req.user.username == event.creator) {
                res.render(CONTROLLER_NAME + '/edit', {
                    'event': event,
                    sports: constants.sports,
                    currentUser: req.user
                })
            } else {
                res.render(CONTROLLER_NAME + "/detail", {
                    'event': event,
                    'currentUser': req.user
                });
            }
        })
    },
    postEdit: function (req, res, next) {
        var id = req.params.id;
        events.edit(id, req.body,req.user, function (event, err) {
            res.render(CONTROLLER_NAME + "/detail", {
                'event': event,
                'currentUser': req.user
            });

        })
    },
    postDelete:function (req,res,next) {
        var id = req.params.id;
        events.delete(id,function (err) {
        })
    },
    postAddComment: function (req,res,next) {

        events.addComment(req.body.id,{
            username:req.user.username,
            content: req.body.comment
        },function (event) {
            res.redirect('/events/details/' + event._id);
        })

    }
}
