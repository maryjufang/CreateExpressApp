'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var session = require('express-session');
var connection = require('express-myconnection');
var config = require('./app-config.js');
var mysql = require('mysql');

var routes = require('./routes/index');


var userService = require('./services/UserService');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(__dirname + '/www/favicon.ico'));
//app.use(logger('dev'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(connection(mysql, config.mysqlconnection, 'pool'));

//app.use(session({secret: 'Some secret', rolling: true, cookie:{maxAge:1800000}}));

//app.use('/files', express.static(path.join(__dirname, '/files')));
app.use(express.static(path.join(__dirname, '/www')));

//app.use('/services/login', loginService);

//Middleware to check if valid session is present
//var checkSession = function(req, res, next) {
//    if (req.session.user) {
//        next();
//    } else {
//        res.send(401);
//    }
//};

//app.use(checkSession);

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return next();
});
// catch 404 and forward to error handler
//app.use(function (req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//Get logged in use info from session
//app.post('/getLoggedInUser', function(req, res, next) {
//    //res.set('Cache-Control', 'no-cache');
//    res.json(req.session.user);
//});

//app.get('/signout', function(req, res, next) {
//    req.session.destroy();
//    res.send(200);
//});

// secure services with session check
app.use('/', routes);
app.use('/services/users/', userService);

//app.set('port', process.env.PORT || 8080);
//start the server
app.listen(3000, function() {
    console.log('Express App started');
});


module.exports = app;


