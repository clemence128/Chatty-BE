import { Application, NextFunction, Request, Response, json, urlencoded } from "express";
import http, { createServer } from "http";
import cors from "cors";
import HTTP_STATUS_CODES from "http-status-codes"
import {Server} from "socket.io";
import { MongodbConnection } from "./db/init.mongodb";
import router from "./routes/index.routes";
import { isProduction } from "./config";

const SERVER_PORT = 5000;
export class AppServer {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public start(): void{
        this.databaseConnection();
        this.standardMiddleware(this.app);
        this.authenticatedMiddleware(this.app);
        this.routes(this.app);
        this.globalErrorHandler(this.app);
        this.startServer(this.app);
    }
    
    private authenticatedMiddleware(app: Application): void{
        app.use(cors({
            origin: 'https://stunning-monstera-5061d1.netlify.app',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
        }));
    }
    private standardMiddleware(app: Application): void{
        app.use(json());
        app.use(urlencoded({extended: true}))
    }

    private databaseConnection(): void{
        MongodbConnection.getInstance();
    }

    private routes(app: Application): void{
        app.use('/api/v1', router)
    }

    private globalErrorHandler(app: Application): void{
        app.all('*', (req: Request, res: Response) => {
            res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
                message: `${req.originalUrl} not found`
            })
        })

        app.use((error: any, req: Request, res: Response, next: NextFunction) => {
            const message = error.message;
            const status = `${error.statusCode}`.startsWith('4') ? 'failed': 'error';
            const statusCode = error.statusCode || 500;
            
            if(isProduction){
                return res.status(statusCode).json({
                    status,
                    message,
                })    
            }
            
            res.status(statusCode).json({
                status,
                message,
                stack: error.stack
            })
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