const redis = require('redis');

// Create a Redis client
const redisClient = redis.createClient({
    url: 'redis://localhost:6379'  // Redis runs on this port on the same machine as the rest of backend (on the Ubuntu server)
});
console.log('Redis client created');
redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

// Connect to Redis
redisClient.connect().catch(console.error);

module.exports = redisClient;