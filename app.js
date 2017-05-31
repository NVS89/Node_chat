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
app.route('/').get(function (req,res,next) {
    res.render('login');
});
app.route('/home').get(function (req,res,next) {
 res.render('index', {
     title:'Home page'
     });
});
app.use(require('middleware/loadUser'));
app.use(require('middleware/loadUser'));
require('routes')(app);
app.use(express.static(path.join(__dirname, '/public')));

module.exports = app;

