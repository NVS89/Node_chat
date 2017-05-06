/**
 * Created by Nick-PC on 06.05.2017.
 */

// mongod --dbpath F:\node_chat\db

/*
var MongoClient = require('mongodb').MongoClient,
    format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/node_chat', function (err, db) {
  console.log('starts');
   if(err) throw err;

   var collection = db.collection('test_insert');
   collection.remove({}, function (err, affected) {
      if (err) throw err;
   });
    collection.insert({a:2}, function (err, docs) {

        //Locate all the entries using find
        collection.find({a:2}).toArray(function (err,results) {
            console.dir(results);
            //Let's close db
            db.close();
        });
   });
});
*/
var mongoose = require('mongoose');
mongoose.connect(config.get('mongoose:uri'));

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('meow');
    }
});