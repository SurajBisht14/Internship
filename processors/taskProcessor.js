const Bull = require('bull');
const taskQueue = new Bull('taskQueue', { redis: { host: 'localhost', port: 6379 } });

taskQueue.process(async (job) => {
  const { user_id } = job.data;
  const message = `${user_id}-task completed at-${Date.now()}`;
  console.log(message);
  require('../services/logger').logToFile(message);
});

module.exports = taskQueue;
