const fs = require('fs-extra');
const path = require('path');
const { logger } = require('../config/logger');

// Delete reports directory
const reportsDirPath = path.join(__dirname, '..', '..', 'reports');
logger.info(`Removing the reports directory -> ${reportsDirPath}`);
fs.emptyDirSync(reportsDirPath);
logger.info('Reports directory removed');

// Delete allure-report directory
const allureReportDirPath = path.join(__dirname, '..', '..', 'allure-report');
logger.info(`Removing the allure-report directory -> ${allureReportDirPath}`);
fs.emptyDirSync(allureReportDirPath);
logger.info('Allure report directory removed');

// Delete allure-results directory
const allureResultsDirPath = path.join(__dirname, '..', '..', 'allure-results');
logger.info(`Removing the allure-results directory -> ${allureResultsDirPath}`);
fs.emptyDirSync(allureResultsDirPath);
logger.info('Allure results directory removed');

// Delete combined.log file
const combinedLogFilePath = path.resolve('./logs/combined.log');
logger.info(`Removing the combined.log file -> ${combinedLogFilePath}`);

fs.removeSync(combinedLogFilePath);
logger.info('File combined.log removed');

// Create logs directory
const logsDirPath = path.join(__dirname, '..', '..', 'logs');
logger.info(`Creating the logs directory -> ${logsDirPath}`);

fs.ensureDirSync(logsDirPath);
logger.info('Logs directory created');
