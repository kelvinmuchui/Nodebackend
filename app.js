'use strict';

var express = require('express');
var exhbs = require('express-handlebars');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');//db
var  session = require('express-session');
var MongoStore = require('connect-mongo') (session);

//..............................................................................................//
// init app
//..............................................................................................//

var app = express();
//..............................................................................................//
// costom middle ware
//..............................................................................................//
var requireLogin =require('./middleware/require_login');

//..............................................................................................//
// login
//..............................................................................................//

//..............................................................................................//
//init Database
//..............................................................................................//

mongoose.connect('mongodb://localhost/myapp');
//..............................................................................................//
//init engine
//..............................................................................................//

// view engine setup
app.engine( '.hbs', exhbs({
	defaultLayout: 'main',
	partialDir: '__dirname' + '/views/partials',
	layoutDir: '__dirname' + '/views/layouts',
	extname: 'hbs'
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

//..............................................................................................//
//app configaration
//..............................................................................................//


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'abominalSnowman',
  resave: false,
  saveUninitilized : true,
  cookie: {},
  store :new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));
app.use(express.static(path.join(__dirname, 'public')));
//..............................................................................................//
//Routers
//..............................................................................................//
var dashboard = require('./routes/dashboard');

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/dashboard*', requireLogin, dashboard);
app.use('/dashboard', dashboard);
//..............................................................................................//
// catch 404 and forward to error handler
//..............................................................................................//
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//..............................................................................................//
// error handler
//..............................................................................................//

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;