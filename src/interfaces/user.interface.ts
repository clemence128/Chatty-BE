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
    userId: string;
    uId: string;
    email: string;
    avatar: string;
    iat ?: string
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
