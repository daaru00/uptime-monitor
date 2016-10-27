var pushover = require( 'pushover-notifications' );

module.exports = function(website, err){

    var pushoverBot = new pushover( {
        user: settings.notifications.pushover.user,
        token: settings.notifications.pushover.token,
        update_sounds: true
    });

    var message = "ERROR "+website+" "+err;

    pushoverBot.send({
        message: message,
        title: website+" ERROR",
        sound: settings.notifications.pushover.sound,
        device: settings.notifications.pushover.device,
        priority: 1
    }, function( err, result ) {
        if(err) console.error(err);
    });

}
