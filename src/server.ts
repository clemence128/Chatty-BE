import { Application } from "express";
import http, { createServer } from "http";
import {Server} from "socket.io";

const SERVER_PORT = 5000;
export class AppServer {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public start(): void{
        this.standardMiddleware(this.app);
        this.globalErrorHandler(this.app);
        this.startServer(this.app);
    }
    
    private standardMiddleware(app: Application): void{}

    private globalErrorHandler(app: Application): void{}

    private startServer(app: Application): void{
        const httpServer = createServer(app);
        const io: Server = this.createSocketIoServer(httpServer);
        
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
}