import express, {Express} from "express"
import { AppServer } from "./server";

class Application {
    public initialize(): void{
        const app: Express = express();
        const server = new AppServer(app);
        server.start();
    }
}

const application = new Application();
application.initialize();