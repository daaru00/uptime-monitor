var parse = require('parse-duration');
var request = require('request');
var url = require('url');
var path = require('path');
var fs = require('fs');
var moment = require('moment');

var websites_path = path.join(__dirname,'websites.json');
var websites = [];
var intervals = [];

module.exports = {
    start: function(){

        websites = require(websites_path);

        websites.forEach(function(website){
            var interval = setInterval(function(){

                var name = url.parse(website).host;
                var t_start = new Date();

                if(settings.debug) console.log(moment().format('YYYY-MM-DD HH:mm:ss')+" "+name+" testing..");

                request({
                    url: website,
                    headers: {
                        'User-Agent': settings.userAgent
                    },
                    followAllRedirects: true,
                    timeout: parse(settings.timeout)
                }, function (err, response, body) {
                    if (!err && response.statusCode == 200) {
                        var t_end = new Date();
                        var t_sec = (+t_end - +t_start) / 1000;
                        if(settings.debug) console.log(moment().format('YYYY-MM-DD HH:mm:ss')+" "+name+" response in "+t_sec);

                        logger(name, "200 "+t_sec);
                    }else{
                        if(response){
                            if(settings.debug) console.log(moment().format('YYYY-MM-DD HH:mm:ss')+" "+name+" failed");

                            notification(name, response.statusCode);
                            logger(name, response.statusCode+" -");
                        }else if(err.code === 'ETIMEDOUT'){
                            if(settings.debug) console.log(moment().format('YYYY-MM-DD HH:mm:ss')+" "+name+" TIMEOUT");

                            notification(name, "TIMEOUT");
                            logger(name, "TIMEOUT"+" -");
                        }
                    }
                });

            }, parse(settings.interval));
            intervals.push(interval);
        });
    },
    stop: function(){
        intervals.forEach(function(interval){
            clearInterval(interval);
        });
    },
    reload: function(){
        module.exports.stop();
        module.exports.start();
    },
    getWebsites: function(){
        return websites;
    },
    removeWebsite: function(website, cb){
        var old_websites = require(websites_path);
        if(old_websites[website]){
            old_websites.splice(old_websites.indexOf(website), 1);
            fs.writeFile(websites_path, JSON.stringify(old_websites), function(err){
                if (err) console.error(err);
                cb(true);
            });
        }else{
            cb(false);
        }
    },
    addWebsite: function(website, cb){
        var old_websites = require(websites_path);
        if(!old_websites[website]){
            old_websites.push(website);
            fs.writeFile(websites_path, JSON.stringify(old_websites), function(err){
                if (err) console.error(err);
                cb(true);
            });
        }else{
            cb(false);
        }
    }
}
