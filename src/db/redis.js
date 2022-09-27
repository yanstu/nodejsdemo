const redis = require('redis');
const { REDIS_PORT, REDIS_HOST } = require('../config/config.default');

// 创建连接终端
const redisClient = redis.createClient(REDIS_PORT, REDIS_HOST);

redisClient.connect();

// 监听存储过程出错
redisClient.on('error', (err) => {
  console.error(err);
});

// 存储值
function set(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val, redis.print);
}

// 读取值
function get(key) {
  return redisClient.get(key);
}

module.exports = {
  set,
  get,
};
