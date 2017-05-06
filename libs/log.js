/**
 * Created by Nick-PC on 03.05.2017.
 */
var winston = require('winston');
var ENV = process.env.NODE_ENV;

function getLogger(module) {
    console.log(module.filename);
    /*uncomment for linux
   var path = module.filename.split('/').slice(-2).join('/');*/
   //uncomment for windows
    var path = module.filename.split('\\').slice(-2).join('\\');

    return new winston.Logger({
        transports:[
            new winston.transports.Console({
              colorize: true,
              level: (ENV =='development') ? 'debug':'error',
              label: path
            })
        ]
    });
}
module.exports = getLogger;