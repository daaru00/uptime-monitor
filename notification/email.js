var email = require("emailjs");

module.exports = function(website, err){
    var server  = email.server.connect(settings.notifications.email);

    var message = "ERROR "+website+" "+err;

    var message = {
        from: settings.notifications.email.from,
        text: website+" ERROR",
        to: settings.notifications.email.to,
        subject: message,
        attachment:[
          {data:"<html>"+logdate()+" "+message+"</html>", alternative:true}
        ]
    };

    server.send(message, function(err, message) {
        if(err) console.error(err);
    });
}
