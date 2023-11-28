"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIpValidator = exports.signUpValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const signUpValidator = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        'string.base': 'Name must be a string',
        'any.required': 'Please provide your name'
    }),
    password: joi_1.default.string().required().min(8).max(32).messages({
        'string.base': 'Password must be a string',
        'string.min': 'Password must be at least 8 characters',
        'string.max': 'Password must be at most 32 characters',
        'any.required': 'Please provide your password'
    }),
    email: joi_1.default.string().required().email().messages({
        'string.base': 'Email must be a string',
        'string.email': 'Please provide a valid email',
        'any.required': 'Please provide your email'
    })
});
exports.signUpValidator = signUpValidator;
const signIpValidator = joi_1.default.object({
    password: joi_1.default.string().required().min(8).max(32).messages({
        'string.base': 'Password must be a string',
        'string.min': 'Password must be at least 8 characters',
        'string.max': 'Password must be at most 32 characters',
        'any.required': 'Please provide your password'
    }),
    email: joi_1.default.string().required().email().messages({
        'string.base': 'Email must be a string',
        'string.email': 'Please provide a valid email',
        'any.required': 'Please provide your email'
    })
});
exports.signIpValidator = signIpValidator;
