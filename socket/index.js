/**
 * Created by Nick-PC on 08.06.2017.
 */

const log = require('../libs/log')(module);

module.exports = function (server) {
    var io = require('socket.io')(server);
    io.set('origins','localhost:*');

    io.on('connection', function (socket) {
        log.info("connected");
        socket.on('disconnect', function () {
            log.info("disconnected");
            io.emit('user disconnected');
        });
        socket.on("message",function (text, cb) {
            socket.broadcast.emit('message', text);
            cb("test");
        });
    });
};