const winston = require('winston')
const logger = winston.createLogger({
    format: winston.format.printf(info => info.message),
    transports: [
        new (winston.transports.File)({
          filename: 'logs/info-log.txt',
          level: 'info'
        }),
        new (winston.transports.File)({
          filename: 'logs/errors-log.txt',
          level: 'error'
        })
    ]
})

module.exports = {
    writeInfo(file, call, msg) {
        logger.info(`message writen by ${file} in ${call} function on ${getTime()}.\n      ${msg}\n`)
    },
    writeError(file, call, msg) {
        logger.error(`error occoured by ${file} in ${call} function on ${getTime()}.\n      ${msg}\n`)
    }
}

const getTime = () => {
    var date = new Date()
    return date
}
/* class Logger {
    logger;
    infoFileName;
    errorFileName;
    constructor(loggerFiles) {
        this.infoFileName = loggerFiles.infoFileName
        this.errorFileName = loggerFiles.errorFileName

        this.logger = logger = winston.createLogger({
            format: winston.format.printf(info => info.message),
            transports: [
                new (winston.transports.File)({
                    filename: `logs/${this.infoFileName}.txt`,
                    level: 'info'
                }),
                new (winston.transports.File)({
                    filename: `logs/${this.errorFileName}.txt`,
                    level: 'error'
                 })
            ]
        })
    }

    writeInfo = (file, call, msg) => {
        this.logger.info(`message writen by ${file} in ${call} function on ${getTime()}.\n      ${msg}\n`)
    }

    writeError = (file, call, msg) => {
        this.logger.error(`error occoured by ${file} in ${call} function on ${getTime()}.\n      ${msg}\n`)
    }


} */