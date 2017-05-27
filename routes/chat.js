/**
 * Created by Nick-PC on 14.05.2017.
 */
exports.get = function (req, res) {
    res.render('chat',{
        userId:req.session.user
    });
};