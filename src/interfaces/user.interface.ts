import { Document } from "mongoose";
import {ObjectId} from "mongodb";

declare global {
    namespace Express {
        interface Request {
            currentUser ?: AuthPayload
        }
    }
}

export interface AuthPayload {
    _id: string;
    email: string;
    avatar: string;
    name: string;
    iat ?: string
}

export interface AuthJwtPayload{
    userId: string;
    iat: number;
    exp: number;
}

export interface IUserDocument extends Document{
    _id: string | ObjectId;
    email: string;
    avatar: string;
    name: string;
    password ?: string;
    createdAt: Date;
    comparePassword(password: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
}

export interface IUserLoginSocket {
    _id: string,
    name: string,
    email: string,
    avatar: string
}