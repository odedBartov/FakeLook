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
    writeInfo(controller, call, msg) {
        logger.info(`message writen by ${controller} controller in ${call} function on ${getTime()}.\n        ${msg}\n`)
    },
    writeError(controller, call, msg) {
        logger.error(`error occoured by ${controller} controller in ${call} function on ${getTime()}.\n        ${msg}\n`)
    }
}

const getTime = () => {
    var date = new Date()
    return date
}