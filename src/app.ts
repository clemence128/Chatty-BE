import express, {Express} from "express"
import { AppServer } from "./server";
import config from "./config";

class Application {
    public initialize(): void{
        this.loadConfig();
        const app: Express = express();
        const server = new AppServer(app);
        server.start();
    }

    private loadConfig(): void{}
}

const application = new Application();
application.initialize();