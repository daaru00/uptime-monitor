var fs = require('fs');
var os = require('os');

module.exports = function(website, msg){
    var path = settings.notifications.file.path;
    var message = logdate()+" "+website+" "+msg;

    fs.appendFile(path, message+os.EOL, function(err){
        if(err) console.error(err);
    });
}
