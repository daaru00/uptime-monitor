var fs = require('fs');
var path = require('path');
var url = require('url');

var TelegramBot = require('node-telegram-bot-api');
var bot = new TelegramBot(settings.notification.telegram.token, {polling: true});

module.exports = function(website, err){

    var message = "ERROR "+website+" "+err;

    bot.sendMessage(settings.notification.telegram.chatId, message);
}

if(settings.notification.telegram.interactive){

    bot.onText(/\/add (.+)/, function (msg, match) {
        var fromId = msg.from.id;
        var website = match[1];
        if(fromId == settings.notification.telegram.chatId){
            checker.addWebsite(function(status){
                if(status){
                    bot.sendMessage(fromId, "Website "+website+" successfully added");
                    checker.reload();
                }else{
                    bot.sendMessage(fromId, "Website "+website+" already on the list");
                }
            })
        }else{
            bot.sendMessage(fromId, "Not authorized");
        }
    });

    bot.onText(/\/remove (.+)/, function (msg, match) {
        var fromId = msg.from.id;
        var website = match[1];
        if(fromId == settings.notification.telegram.chatId){
            checker.removeWebsite(function(status){
                if(status){
                    bot.sendMessage(fromId, "Website "+website+" successfully removed");
                    checker.reload();
                }else{
                    bot.sendMessage(fromId, "Website "+website+" not found on the list");
                }
            })
        }else{
            bot.sendMessage(fromId, "Not authorized");
        }
    });

    bot.onText(/\/list/, function (msg, match) {
        var fromId = msg.from.id;
        if(fromId == settings.notification.telegram.chatId){
            listWebsite(function(message){
                var websites = checker.getWebsites();
                var message = "";

                websites.forEach(function(website){
                    message += website+"\n"
                })

                bot.sendMessage(fromId, message);
            })
        }else{
            bot.sendMessage(fromId, "Not authorized");
        }
    });

}
