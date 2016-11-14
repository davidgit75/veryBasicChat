var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var utils = require("./utils");
var session = require("express-session");
var redisStore = require("connect-redis")(session);

var controllers = require('./controllers');

var app = express();
var server = http.Server(app);

var sessionMiddleware = session({
    store: new redisStore({}),
    secret: "*s3cr3t*",
    resave: false,
    saveUninitialized: false
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static("/public", path.join(__dirname, 'public')));
app.use("/modules", express.static(path.join(__dirname, 'node_modules')));

app.use(sessionMiddleware);

app.use('/', controllers);

utils.realtime(server, sessionMiddleware);


server.listen(process.env.PORT || 3004);

module.exports = app;
