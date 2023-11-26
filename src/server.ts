import { Application, NextFunction, Request, Response, json, urlencoded } from "express";
import http, { createServer } from "http";
import HTTP_STATUS_CODES from "http-status-codes"
import {Server} from "socket.io";
import { MongodbConnection } from "./db/init.mongodb";
import { CacheConnection } from "./db/init.cache";

const SERVER_PORT = 5000;
export class AppServer {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public start(): void{
        this.standardMiddleware(this.app);
        this.globalErrorHandler(this.app);
        this.databaseConnection();
        this.startServer(this.app);
    }
    
    private standardMiddleware(app: Application): void{
        app.use(json());
        app.use(urlencoded({extended: true}))
    }

    private databaseConnection(): void{
        MongodbConnection.getInstance();
        CacheConnection.getInstance();
    }

    private globalErrorHandler(app: Application): void{
        app.all('*', (req: Request, res: Response) => {
            res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
                message: `${req.originalUrl} not found`
            })
        })

        app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
            
        })
    }

    private startServer(app: Application): void{
        const httpServer = createServer(app);
        const io: Server = this.createSocketIoServer(httpServer);
        this.socketIoConnections(io);
        httpServer.listen(SERVER_PORT, () => {
            console.log("Server listening on port " + SERVER_PORT);
        })
    }

    private createSocketIoServer(httpServer: http.Server): Server{
        const io = new Server(httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
            }
        })

        return io
    }

    private socketIoConnections(io: Server): void{}
}