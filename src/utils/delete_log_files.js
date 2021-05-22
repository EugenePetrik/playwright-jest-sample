const fs = require('fs-extra');
const path = require('path');
const { logger } = require('../config/logger');

const combinedLogFilePath = path.resolve('./combined.log');
logger.info(`Removing the file ${combinedLogFilePath} ...`);
fs.removeSync(combinedLogFilePath);
logger.info(`File ${combinedLogFilePath} removed!!!`);
