"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
class AuthController {
    async signup(req, res, next) {
        const { password, email, name } = req.body;
        res.status(http_status_codes_1.default.CREATED).json({
            message: "Signup successfully",
            data: await auth_service_1.default.signup({ name, password, email })
        });
    }
    async signin(req, res, next) {
        const { password, email } = req.body;
        res.status(http_status_codes_1.default.CREATED).json({
            message: "Signin successfully",
            data: await auth_service_1.default.signin({ password, email })
        });
    }
}
exports.default = new AuthController();
