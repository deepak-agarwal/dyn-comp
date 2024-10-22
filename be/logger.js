const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'app.log' })]
})

const designLogging = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'design.log' })]
})

const contextLogging = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'context.log' })]
})
const generationLogging = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'logs/generation.log' })]
})
logger.stream = {
  write: function (message, encoding) {
    logger.info(message.trim())
  }
}

// Function to log API calls
logger.logAPICall = (request) => {
  logger.info({
    method: request.method,
    url: request.url,
    body: request.req.body
  })
}

designLogging.designTask = (log) => {
  designLogging.info(log)
}

contextLogging.logAPICall = (log) => {
  contextLogging.info(log)
}

generationLogging.logAPICall = (log) => {
  generationLogging.info(log)
}

module.exports.logger = logger
module.exports.designLogging = designLogging
module.exports.contextLogging = contextLogging
module.exports.generationLogging = generationLogging
