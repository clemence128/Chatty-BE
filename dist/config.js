"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProduction = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Config {
    NODE_ENV;
    MONGODB_DEV;
    MONGODB_PROD;
    REDIS_DEV;
    REDIS_PROD;
    ACCESS_TOKEN_SECRET;
    ACCESS_TOKEN_EXPIRE;
    REFRESH_TOKEN_SECRET;
    REFRESH_TOKEN_EXPIRE;
    isProduction() {
        return this.NODE_ENV === "production";
    }
    constructor() {
        this.NODE_ENV = process.env.NODE_ENV || 'development';
        this.MONGODB_DEV = process.env.MONGODB_DEV || '';
        this.MONGODB_PROD = process.env.MONGODB_PROD || '';
        this.REDIS_DEV = process.env.REDIS_DEV || '';
        this.REDIS_PROD = process.env.REDIS_PROD || '';
        this.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';
        this.ACCESS_TOKEN_EXPIRE = process.env.ACCESS_TOKEN_EXPIRE || '';
        this.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '';
        this.REFRESH_TOKEN_EXPIRE = process.env.REFRESH_TOKEN_EXPIRE || '';
    }
}
const config = new Config();
exports.default = config;
exports.isProduction = config.isProduction();
