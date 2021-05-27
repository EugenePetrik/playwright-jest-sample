const path = require('path');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({ level: 'info' }),
    new winston.transports.File({ filename: path.join(__dirname, '..', '..', 'logs', 'combined.log'), level: 'debug' }),
  ],
  format: winston.format.simple(),
});

module.exports = {
  logger,
};
