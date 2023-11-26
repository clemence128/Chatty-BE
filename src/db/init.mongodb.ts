import config, { isProduction } from "~/config";
import mongoose from "mongoose"

export class MongodbConnection {
    static instance: MongodbConnection;

    constructor(){
        this.connect();
    }

    private connect(): void{
        let connectionString = config.MONGODB_DEV;

        if(isProduction){
            mongoose.set('debug', true)
            mongoose.set('debug', {color: true})
            connectionString = config.MONGODB_PROD;
        }

        mongoose.connect(connectionString)
        .then(_ => console.log(`Connected to MongoDB successfully`))
        .catch((err) => console.log(`Error connecting to MongoDB `, err))
    }

    public static getInstance(): MongodbConnection{
        if(!MongodbConnection.instance){
            MongodbConnection.instance = new MongodbConnection()
        }

        return MongodbConnection.instance;
    }
}

