var lawgs = require('lawgs');

lawgs.config({
    aws: {
        accessKeyId: settings.loggers.cloudwatch.accessKeyId,
        secretAccessKey: settings.loggers.cloudwatch.secretAccessKey,
        region: settings.loggers.cloudwatch.region
    }
});

var logger  = lawgs.getOrCreate(settings.loggers.cloudwatch.logGroup);

module.exports = function(website, msg){

    var message = logdate()+" "+website+" "+msg;

    logger.log(name, message);
}
