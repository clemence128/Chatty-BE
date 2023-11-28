"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const SALT_ROUND = 10;
const userSchema = new mongoose_1.Schema({
    password: { type: String },
    name: { type: String },
    email: { type: String, unique: true },
    avatar: { type: String, default: 'https://res.cloudinary.com/dfrp35blc/image/upload/v1701065630/profile-default-svgrepo-com_jwc0pc.svg' },
    createdAt: { type: Date, default: Date.now },
}, {
    toJSON: {
        transform(_doc, ret) {
            delete ret.password;
            return ret;
        }
    }
});
userSchema.pre('save', async function (next) {
    const hashedPassword = await (0, bcrypt_1.hash)(this.password, SALT_ROUND);
    this.password = hashedPassword;
    next();
});
userSchema.methods.comparePassword = async function (password) {
    const hashedPassword = this.password;
    return await (0, bcrypt_1.compare)(password, hashedPassword);
};
userSchema.methods.hashPassword = async function (password) {
    return await (0, bcrypt_1.hash)(password, SALT_ROUND);
};
const UserModel = (0, mongoose_1.model)("User", userSchema);
exports.default = UserModel;
