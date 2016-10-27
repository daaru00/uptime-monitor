var path = require('path');

var notifications = {
    email: require(path.join(__dirname,'email.js')),
    telegram: require(path.join(__dirname,'telegram.js')),
    pushover: require(path.join(__dirname,'pushover.js'))
}

module.exports = function(website, err){
    if(notifications[settings.notificationEngine])
        notifications[settings.notificationEngine](website, err);
    else
        console.error("loggerEngine not found");
}
