var parse = require('parse-duration');
var request = require('request');
var url = require('url');
var moment = require('moment');
var path = require('path');

global.settings = require(path.join(__dirname,'settings.json'));
global.notification = require(path.join(__dirname,'triggerNotification.js'));
global.checker = require(path.join(__dirname,'checker.js'));
global.logger = require(path.join(__dirname,'logger'));

/*
 * Start checker
 */

checker.start();

/*
 * Utilities
 */

Date.prototype.toStandarFormat = function() {
    return this.getUTCFullYear() + '-' +
    ('00' + (this.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + this.getUTCDate()).slice(-2) + ' ' +
    ('00' + this.getUTCHours()).slice(-2) + ':' +
    ('00' + this.getUTCMinutes()).slice(-2) + ':' +
    ('00' + this.getUTCSeconds()).slice(-2);
}

global.logdate = function(){
    return "["+(new Date()).toStandarFormat()+"]";
}

/*
 * Exit Handler
 */

process.on('exit', exitHandler.bind(null, {cleanup:true}));
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
function exitHandler(options, err) {
    if (options.cleanup){
        checker.stop();
    }
    if (err) console.error(err);
    if (options.exit) process.exit();
}
