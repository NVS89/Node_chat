/**
 * Created by Nick-PC on 10.06.2017.
 */

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const sessionStore = new MongoStore({mongooseConnection: mongoose.connection});

module.exports = sessionStore;
