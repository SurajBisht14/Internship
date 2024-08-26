const { RateLimiterRedis, RateLimiterMemory } = require('rate-limiter-flexible');
const Redis = require('redis');
const redisClient = Redis.createClient();

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 20, // 20 points
  duration: 60, // Per 1 minute
});

const perSecondLimiter = new RateLimiterMemory({
  points: 1, // 1 point
  duration: 1, // Per 1 second
});

module.exports = {
  rateLimiter,
  perSecondLimiter
};
