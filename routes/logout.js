/**
 * Created by Nick-PC on 28.05.2017.
 */
exports.post = function (req, res) {
    req.session.destroy();
    res.redirect('/');
};