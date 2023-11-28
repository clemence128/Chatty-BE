"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../core/AppError"));
const user_repo_1 = __importDefault(require("../repositories/user.repo"));
const user_cache_1 = __importDefault(require("../redis/user.cache"));
class AuthService {
    generateAccessToken(userId) {
        return new Promise((reslove, reject) => {
            jsonwebtoken_1.default.sign({ userId }, config_1.default.ACCESS_TOKEN_SECRET, { expiresIn: config_1.default.ACCESS_TOKEN_EXPIRE }, (err, token) => {
                if (err)
                    return reject(err);
                reslove(token);
            });
        });
    }
    ;
    generateRefreshToken(userId) {
        return new Promise((reslove, reject) => {
            jsonwebtoken_1.default.sign({ userId }, config_1.default.REFRESH_TOKEN_SECRET, { expiresIn: config_1.default.REFRESH_TOKEN_EXPIRE }, (err, token) => {
                if (err)
                    return reject(err);
                reslove(token);
            });
        });
    }
    async signup({ name, email, password }) {
        const existingUser = await user_repo_1.default.findByEmail(email);
        if (existingUser)
            throw new AppError_1.default("This email is already in use.", http_status_codes_1.default.BAD_REQUEST);
        const user = await user_repo_1.default.save({ name, email, password });
        if (!user)
            throw new AppError_1.default("Something went wrong", http_status_codes_1.default.INTERNAL_SERVER_ERROR);
        const [accessToken, refreshToken] = await Promise.all([this.generateAccessToken(user._id.toString()), this.generateRefreshToken(user._id.toString()), user_cache_1.default.addUser(user)]);
        return {
            user,
            token: {
                accessToken,
                refreshToken,
            }
        };
    }
    async signin({ email, password }) {
        const existingUser = await user_repo_1.default.findByEmail(email);
        if (!existingUser)
            throw new AppError_1.default("Bad credentials", http_status_codes_1.default.BAD_REQUEST);
        const isCorrectPassword = await existingUser.comparePassword(password);
        if (!isCorrectPassword)
            throw new AppError_1.default("Bad credentials", http_status_codes_1.default.BAD_REQUEST);
        const [accessToken, refreshToken] = await Promise.all([this.generateAccessToken(existingUser._id.toString()), this.generateRefreshToken(existingUser._id.toString()), user_cache_1.default.addUser(existingUser)]);
        return {
            use: existingUser,
            token: {
                accessToken,
                refreshToken,
            }
        };
    }
}
exports.default = new AuthService();
