var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require('cors');

var app = express();

app.use(cors(
  {
    origin:['http://localhost:4200','http://127.0.0.1:4200'],
    credentials:true  
    
  }))

  var mongoose = require('mongoose');
  mongoose.connect('mongodb://127.0.0.1:27017/tutorial1', { useNewUrlParser: true, useUnifiedTopology:true });

  var passport = require('passport');
  var session = require('express-session');

  app.use(session({
  name:'my-sid',
  resave:false,
  saveUninitialized:false,
  secret:'secret',
  cookie:{
    maxAge:3600000,
    httpOnly:false,
    secure:false
  }
  }))

 
  app.use(passport.initialize());
  app.use(passport.session());

 require('./passport-config');

  var bodyParser = require('body-parser');


  
  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



  app.use('/', indexRouter);
app.use('/users', usersRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.listen(process.env.PORT || 8080); // line added for heroku deployment



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
