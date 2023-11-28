import {createClient} from "redis";
import config, { isProduction } from "~/config";

export type RedisClient = ReturnType<typeof createClient>

export abstract class BaseCache{
    client: RedisClient

    constructor(){
        let connectionString = isProduction ? config.REDIS_PROD : config.REDIS_DEV;
        
        this.client = createClient({url: connectionString});
        
        this.client.on('error', (error) => console.log("Connecting to Redis failed", error))
    }   
}




