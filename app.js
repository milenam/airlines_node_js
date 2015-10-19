
module.exports = function(flights) {
  var express = require('express');
  //var MongoStore = require('connect-mongo')(express); // for sessions
  var cookieParser = require('cookie-parser');
  var expressSession = require('express-session');
  var MongoStore = require('connect-mongo')(expressSession);
  var passport = require('./auth');
  var path = require('path');
  var favicon = require('serve-favicon');
  var logger = require('morgan');
  //var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');

  var routes = require('./routes/index');
  // var users = require('./routes/users');

  var app = express();

   app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(expressSession({
         secret: 'secret',
         store: new MongoStore({url: 'mongodb://Meli:123fourfive@ds037824.mongolab.com:37824/flights'}),
         resave: false,
         saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));


    app.use(function(req, res, next) {
      res.set('X-Powered-By', 'Flight Tracker');
      next();
    })
    //app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', routes);
    // app.use('/users', users);


    // app.get('/flight1', routes.flight1);
    // app.get('/flight2', routes.flight2);
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });



    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }



    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });

   return app;

};
// view engine setup