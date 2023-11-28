"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_cache_1 = require("./base.cache");
class UserCache extends base_cache_1.BaseCache {
    async addUser(user) {
        if (!this.client.isOpen)
            await this.client.connect();
        await this.client.set(`user:${user.id}`, JSON.stringify(user));
    }
}
exports.default = new UserCache();
