import {createClient} from 'redis';
import { BaseCache } from "~/redis/base.cache";

export type RedisClient = ReturnType<typeof createClient>

class RedisConnection extends BaseCache{

    async connect(): Promise<void>{
        try {
            await this.client.connect();
            console.log(`Connected to Redis successfully`)
        } catch (error) {
            
        }
    }
}

export const redisConnection = new RedisConnection()