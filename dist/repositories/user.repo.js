"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
class UserRepository {
    findByEmail = async (email) => {
        return await user_model_1.default.findOne({ email });
    };
    save = async ({ name, email, password }) => {
        return await user_model_1.default.create({ name, email, password });
    };
}
exports.default = new UserRepository();
