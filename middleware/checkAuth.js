/**
 * Created by Nick-PC on 28.05.2017.
 */
const HttpError = require('errors').HttpError;

module.exports = function (req, res, next) {
  if(!req.session.user){
      res.redirect('/');
      //return next(new HttpError(401, "You need to authorize"));
  }
  next();
};