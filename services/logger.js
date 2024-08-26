const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '..', 'task.log');

function logToFile(message) {
  fs.appendFile(logFile, `${message}\n`, (err) => {
    if (err) throw err;
  });
}

module.exports = { logToFile };
