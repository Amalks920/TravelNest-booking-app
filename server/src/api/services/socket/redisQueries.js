const client = require("../../../config/redisConfig");

class RedisSessionStore {
    async findSession(id) {
      const sessionData = await client.get(`session:${id}`);
      return sessionData ? JSON.parse(sessionData) : null;
    }
  
    async saveSession(id, session) {
      await client.set(`session:${id}`, JSON.stringify(session));
    }
  
    async findAllSessions() {
      const keys = await client.keys('session:*');
      const sessions = await client.mget(...keys);
  
      return sessions.map(sessionData => JSON.parse(sessionData));
    }
  }
  
  module.exports = new RedisSessionStore();