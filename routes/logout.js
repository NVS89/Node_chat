/**
 * Created by Nick-PC on 28.05.2017.
 */
exports.post = function (req, res, next) {
    var sid = req.session.id;
    var io = req.app.get('io');

    req.session.destroy(
        function (err) {
           // io.sockets.$emit("sessionReload", sid);
            io.sockets._events.sessionReload(sid);
            if(err){
              return next(err);
            }

            res.redirect('/');
        }
    );
};