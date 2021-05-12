const fs = require('fs-extra');
const path = require('path');

const combinedLogFilePath = path.resolve('./combined.log');
fs.removeSync(combinedLogFilePath);
