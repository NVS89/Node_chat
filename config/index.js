/**
 * Created by Nick-PC on 03.05.2017.
 */
var nconf = require('nconf');
var path = require('path');

nconf.argv()
    .env()
    .file({file: path.join(__dirname,'config.json')});
module.exports = nconf;