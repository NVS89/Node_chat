const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const connect = require('connect');
//const errorHandler = require('errorhandler');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
//const methodOverride = require('method-override');

const index = require('./routes/index');
const users = require('./routes/users');

const config = require('config');
const mongoose = require('libs/mongoose');
const MongoStore = require('connect-mongo')(session);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/public/templates'));
app.set('view engine', 'pug');

//environments
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if(app.get('env')=='development'){
    app.use(logger('dev'));
}else{
    app.use(logger('default'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

/*app.use(function (req,res, next) {
   req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
   res.send("Visits: " + req.session.numberOfVisits);
});*/

app.route('/').get(function (req,res,next) {
 res.render('index', {
     title:'Home page'
     });
});

//app.use(require('middleware/sendHttpError'));
//app.use(app.router);
require('routes')(app);
app.use(express.static(path.join(__dirname, '/public')));




/*app.route('/').get(function (req,res,next) {
    res.sendFile(__dirname +'/public/templates/index.html')

});*/

/*app.get('/page1', function (req, res) {
    console.log(req.path);
    res.render(req.path);
});
app.get('/page2', function (req, res) {
    res.render(req.path);
});*/
/*app.route('/').get(function (req,res,next) {
    res.render('index.html')
});*/
//app.use(methodOverride());
//app.use(session());


/*/!*Middleware*!/
app.use(function (req,res,next) {
   if(req.url == "/") {
       res.end("Hello");
   }else{
       next();
   }
});

app.use(function (req,res,next) {
    if(req.url=="/forbidden"){
        next(new Error("access denied"));
    }else {
        next();
    }
});

app.use(function (req,res,next) {
    if(req.url=="/test"){
        res.end("Welcome on test page");
    }else {
        next();
    }
});

app.use(function (req,res) {
    res.status(404).send("Page Not Found Sorry");
});
 app.use(function (err, req, res, next) {
    if(app.get('env')=='development'){
      var errorhandler = errorHandler();
      errorhandler(err, req, res, next);
    }else {
     res.status(500);
    };
 });*/
/*// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

module.exports = app;

