import Redis from "ioredis"
import config, { isProduction } from "~/config";


export abstract class BaseCache{
    client: Redis

    constructor(){
        let connectionString = isProduction ? config.REDIS_PROD : config.REDIS_DEV;    
        this.client = new Redis(connectionString);
        console.log(`Connected to Redis successfully`)
        // this.client.on('error', (error) => console.log("Connecting to Redis failed", error))
    }   
}