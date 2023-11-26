import dotenv from "dotenv"
dotenv.config();

class Config{
    public NODE_ENV: string
    public MONGODB_DEV: string
    public MONGODB_PROD: string
    public REDIS_DEV: string
    public REDIS_PROD: string

    public isProduction(): boolean{
        return this.NODE_ENV === "production";
    }

    constructor(){
        this.NODE_ENV = process.env.NODE_ENV || 'development';
        this.MONGODB_DEV = process.env.MONGODB_DEV || ''
        this.MONGODB_PROD = process.env.MONGODB_PROD || ''
        this.REDIS_DEV = process.env.REDIS_DEV || ''
        this.REDIS_PROD = process.env.REDIS_PROD || ''
    }
}

const config = new Config();
export default config;

export const isProduction = config.isProduction();