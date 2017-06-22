/**
 * Created by Nick-PC on 08.06.2017.
 */

const log = require('../libs/log')(module);
// const connect = require('connect');
const cookieParser = require('cookie-parser');
const config = require('config');
const async = require('async');
const cookie = require('cookie');
const sessionStore = require('libs/sessionStore');
const HttpError = require('errors').HttpError;
const User = require('models/user').User;

function LoadSession(sid, callback) {
    sessionStore.load(sid, function (err, session) {
        if(arguments.length == 0){
            return callback(null, null);
        }else{
            return callback(null,session);
        }
    });
}

function LoadUser(session, callback) {
    if(!session.user){
       // log.info("Session %s is anonymous", session.id);
        return callback(null,null);
    }
     //log.info("retrieving user ", session.user);

    User.findById(session.user,function (err, user) {
        if (err){
            return callback(err);
        }
        if(!user){
            return callback(null, null)
        }
        //log.info("user findbyid result:" + user);
        callback(null, user);
    });
}

module.exports = function (server) {
    var io = require('socket.io')(server);
    io.set('origins','localhost:*');

    io.set('authorization', function (handshake, callback) {
        async.waterfall([
            function (callback) {
                handshake.cookies = cookie.parse(handshake.headers.cookie || '');
                var sidCookie = handshake.cookies[config.get('session:key')];
               //  var sid = connect.utils.parseSignedCookie(sidCookie,config.get('session:secret'));
                var sid = cookieParser.signedCookie(sidCookie,config.get('session:secret'));
                LoadSession(sid, callback);
            },
            function (session,callback) {
                if(!session){
                    callback(new HttpError(401,"No session"));
                }
                handshake.session = session;
                LoadUser(session,callback);
            },
            function (user, callback) {
                if(!user){
                    callback(new HttpError(403,"Anonymous session may not connect"));
                }
                handshake.user = user;
                callback(null);
            }
        ], function (err) {
                if(!err){
                    return callback(null, true);
                }
                if(err instanceof HttpError){
                    return callback(null, false);
                }
            callback(err);
        })
    });

    io.on('sessionReload', function (sid) {

        function findClientsSocket(roomId, namespace) {
            var res = []
                // the default namespace is "/"
                , ns = io.of(namespace ||"/");

            if (ns) {
                for (var id in ns.connected) {
                    if(roomId) {
                        var index = ns.connected[id].rooms.indexOf(roomId);
                        if(index !== -1) {
                            res.push(ns.connected[id]);
                        }
                    } else {
                        res.push(ns.connected[id]);
                    }
                }
            }
            return res;
        }
        var clients = findClientsSocket();
            for (var client in clients) {

                    if (client.handshake.session.id != sid) return;

                    LoadSession(sid, function (err, session) {
                        if (err) {
                            client.emit("err", "server error");
                            client.disconnect();
                            return;
                        }
                        if (!session) {
                            client.emit("logout");
                            client.disconnect();
                            return;
                        }
                        client.handshake.session = session;
                    });
            }


        /*Object.keys(clients).forEach(function (client) {
            console.log(client);
            if(client.Socket.handshake.session.id != sid) return;

            LoadSession(sid, function (err, session) {
                if(err){
                    client.emit("err","server error");
                    client.disconnect();
                    return;
                }
                if(!session){
                    client.emit("logout");
                    client.disconnect();
                    return;
                }
                client.Socket.handshake.session = session;
            });
        })*/
        }
    );

    io.on('connection', function (socket) {
        var username = socket.request.user.get("username");
        log.info("connected");
        socket.broadcast.emit('join', username);

        socket.on("message", function (text, callback) {
            socket.broadcast.emit('message', username, text);
            callback && callback();
        });

        socket.on('disconnect', function () {
            log.info("disconnected");
            io.emit('user disconnected');
            socket.broadcast.emit('leave',username);
        });
    });

    return io;
};