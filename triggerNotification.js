var moment = require('moment');
var parse = require('parse-duration');
var alerts_history = {};

var notificationEngine = require(path.join(__dirname,'notifications'));

module.exports = function(website, err){
    if(canSend(website)){
        notificationEngine(website, err);
    }
}

function canSend(website){
    if(alerts_history[website] != undefined){
        var last_fired = alerts_history[website];
        var noRealert = parse(settings.noRealert);
        var duration = moment.duration(moment(new Date).diff(last_fired));
        if(duration.asMilliseconds() > noRealert){
            alerts_history[website] = new Date();
            return true;
        }else{
            return false;
        }
    }else{
        alerts_history[website] = new Date();
        return true;
    }
}
