import { Document } from "mongoose";
import {ObjectId} from "mongodb"

export interface IConservationDocument extends Document{
    _id: string | ObjectId,
    name?: string,
    creator : string | ObjectId,
    users: Array<string | ObjectId>,
    isGroup ?: boolean,
    latestMessage ?: string | ObjectId,
    avatar ?: string,
    createdAt ?: Date,
    updatedAt ?: Date
}