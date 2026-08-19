const { createClient } = require('redis');

let client = null;

async function getClient() {
  if (process.env.REDIS_ENABLED !== 'true') return null;
  if (client?.isOpen) return client;

  client = createClient({ url: process.env.REDIS_URL || 'redis://127.0.0.1:6379' });
  client.on('error', err => console.error('Redis error:', err.message));
  await client.connect();
  return client;
}

const cache = {
  async get(key) {
    const c = await getClient();
    if (!c) return null;
    const value = await c.get(key);
    return value ? JSON.parse(value) : null;
  },
  async set(key, value, ttl = 300) {
    const c = await getClient();
    if (!c) return;
    await c.setEx(key, ttl, JSON.stringify(value));
  },
  async del(key) {
    const c = await getClient();
    if (!c) return;
    await c.del(key);
  }
};

module.exports = { getClient, cache };
