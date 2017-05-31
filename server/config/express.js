var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    app = express(),
    passport = require('passport');

module.exports = function(config) {
    app.set('views', config.rootPath + 'server/views');
    app.set('view engine', 'jade');
    app.use("/public",express.static(config.rootPath + '/public'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({secret: 'tues', resave: true, saveUninitialized: true}));
    app.use(passport.initialize());
    app.use(passport.session());

    return app;
};
