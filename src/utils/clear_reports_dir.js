const fs = require('fs-extra');
const path = require('path');
const { logger } = require('../config/logger');

const reportsPath = path.join(__dirname, '../reports');
logger.info(`Removing the directory ${reportsPath} ...`);
fs.emptyDirSync(reportsPath);
logger.info(`Directory ${reportsPath} removed!!!`);
