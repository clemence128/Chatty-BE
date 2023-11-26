import {createClient} from "redis";
import config, { isProduction } from "~/config";

export type RedisClient = ReturnType<typeof createClient>

export class CacheConnection{
    static instance: CacheConnection
    client: RedisClient

    constructor(){
        this.connect();
    }

    private async connect(): Promise<void>{
        let connectionString = isProduction ? config.REDIS_PROD : config.REDIS_DEV;
        
        this.client = await createClient({url: connectionString}).connect()
        
        this.client.on('error', (error) => console.log("Connecting to Redis failed", error))
        console.log('Connected to Redis successfully.')
    }

    public static getInstance(): CacheConnection{
        if(CacheConnection.instance == null){
            CacheConnection.instance = new CacheConnection()
        }

        return CacheConnection.instance
    }

    public getCacheClient() {
        return this.client;
    }
}

export const redisClient = CacheConnection.getInstance().getCacheClient()



