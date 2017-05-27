/**
 * Created by Nick-PC on 14.05.2017.
 */
const User = require('models/user').User;
const HttpError = require('errors').HttpError;
const AuthError = require('models/user').AuthError;
const async = require('async');


exports.get = function (req, res) {
    res.render('login');
};

exports.post = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.authorize(username,password,function (err, user) {
        if(err){
            if(err instanceof AuthError){
                return next(new HttpError('403',err.message));
            }else {
                return next(err);
            }
        }
        req.session.user = user._id;
        res.send({});
    });
};

