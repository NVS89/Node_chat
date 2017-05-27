module.exports = function (app) {
  app.get('/',require('./frontpage').get);
  app.get('/login', require('./login').get);
  app.post('/login', require('./login').post);
  app.get('/chat', require('./chat').get);
};




/*var express = require('express');
var router = express.Router();

/!* GET home page. *!/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;*/
