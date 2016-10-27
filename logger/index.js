var path = require('path');

var loggers = {
    email: require(path.join(__dirname,'email.js')),
    telegram: require(path.join(__dirname,'telegram.js')),
    pushover: require(path.join(__dirname,'pushover.js'))
}

module.exports = function(website, err){
    if(loggers[settings.loggerEngine])
        loggers[settings.loggerEngine](website, err);
    else
        console.error("loggerEngine not found");
}
