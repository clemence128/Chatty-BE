"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../core/AppError"));
const validate = (validationSchema) => {
    return async (req, res, next) => {
        try {
            await validationSchema.validateAsync(req.body);
            next();
        }
        catch (error) {
            next(new AppError_1.default(error.details[0].message, http_status_codes_1.default.UNPROCESSABLE_ENTITY));
        }
    };
};
exports.default = validate;
