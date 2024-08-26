const express = require('express');
const { rateLimiter, perSecondLimiter } = require('./services/rateLimiter');
const taskQueue = require('./processors/taskProcessor');
const { logToFile } = require('./services/logger');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());


app.post('/task', async (req, res) => {
  const { user_id } = req.body;
  try {
    // Apply rate limiting
    await rateLimiter.consume(user_id);
    await perSecondLimiter.consume(user_id);

    // Add task to queue if within limits
    await taskQueue.add({ user_id });
    res.status(200).send('Task accepted');
  } catch (error) {
    if (error.message === 'Too Many Requests') {
      // Queue the task if rate limit is exceeded
      await taskQueue.add({ user_id });
      res.status(429).send('Rate limit exceeded. Task queued');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
