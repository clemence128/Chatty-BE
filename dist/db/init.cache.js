"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConnection = void 0;
const base_cache_1 = require("../redis/base.cache");
class RedisConnection extends base_cache_1.BaseCache {
    async connect() {
        try {
            await this.client.connect();
            console.log(`Connected to Redis successfully`);
        }
        catch (error) {
        }
    }
}
exports.redisConnection = new RedisConnection();
