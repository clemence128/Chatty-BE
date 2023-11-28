"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppServer = void 0;
const express_1 = require("express");
const http_1 = require("http");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const socket_io_1 = require("socket.io");
const init_mongodb_1 = require("./db/init.mongodb");
const init_cache_1 = require("./db/init.cache");
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const config_1 = require("./config");
const SERVER_PORT = 5000;
class AppServer {
    app;
    constructor(app) {
        this.app = app;
    }
    start() {
        this.databaseConnection();
        this.standardMiddleware(this.app);
        this.routes(this.app);
        this.globalErrorHandler(this.app);
        this.startServer(this.app);
    }
    standardMiddleware(app) {
        app.use((0, express_1.json)());
        app.use((0, express_1.urlencoded)({ extended: true }));
    }
    databaseConnection() {
        init_mongodb_1.MongodbConnection.getInstance();
        init_cache_1.redisConnection.connect();
    }
    routes(app) {
        app.use('/api/v1', index_routes_1.default);
    }
    globalErrorHandler(app) {
        app.all('*', (req, res) => {
            res.status(http_status_codes_1.default.NOT_FOUND).json({
                message: `${req.originalUrl} not found`
            });
        });
        app.use((error, req, res, next) => {
            const message = error.message;
            const status = `${error.statusCode}`.startsWith('4') ? 'failed' : 'error';
            const statusCode = error.statusCode || 500;
            if (config_1.isProduction) {
                return res.status(statusCode).json({
                    status,
                    message,
                });
            }
            res.status(statusCode).json({
                status,
                message,
                stack: error.stack
            });
        });
    }
    startServer(app) {
        const httpServer = (0, http_1.createServer)(app);
        const io = this.createSocketIoServer(httpServer);
        this.socketIoConnections(io);
        httpServer.listen(SERVER_PORT, () => {
            console.log("Server listening on port " + SERVER_PORT);
        });
    }
    createSocketIoServer(httpServer) {
        const io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
            }
        });
        return io;
    }
    socketIoConnections(io) { }
}
exports.AppServer = AppServer;
