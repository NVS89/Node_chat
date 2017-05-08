/**
 * Created by Nick-PC on 07.05.2017.
 */
var mongoose = require('libs/mongoose');
//mongoose.set('debug', true);
var async = require('async');
// var User = require('models/user').User;

async.series([
    openDB,
    dropDB,
    modelLoader,
    createUsers
],function (err, results) {
    console.log(arguments);
    console.log(results);
    mongoose.disconnect();
    process.exit(err ? 255:0);
});

function openDB(callback) {
    mongoose.connection.on('open',callback);
}

function dropDB(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function modelLoader(callback) {
    require('models/user');

    async.each(Object.keys(mongoose.models), function (modelName,callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback) {
    var users = [
        {username:'Test1',password:'Pass1'},
        {username:'Test2',password:'Pass2'},
        {username:'Test3',password:'Pass3'}
    ];
    async.each(users, function (userData, callback) {
        var user = new mongoose.models.User(userData);
        user.save(callback);
    },callback);
    /* async.parallel([
     function (callback) {
     var user_1 = new User({username:'Test1',password:'Pass1'});
     user_1.save(function (err) {
     callback(err, user_1);
     });
     },
     function (callback) {
     var user_2 = new User({username:'Test2',password:'Pass2'});
     user_2.save(function (err) {
     callback(err, user_2);
     })
     },
     function (callback) {
     var user_3 = new User({username:'Test3',password:'Pass3'});
     user_3.save(function (err) {
     callback(err, user_3);
     });
     }],callback);*/
}
/*
 function closeDB(callback) {
 mongoose.disconnect(callback);
 }*/
