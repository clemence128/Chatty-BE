"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("./server");
class Application {
    initialize() {
        this.loadConfig();
        const app = (0, express_1.default)();
        const server = new server_1.AppServer(app);
        server.start();
    }
    loadConfig() { }
}
const application = new Application();
application.initialize();
