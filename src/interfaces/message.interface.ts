import { Document } from "mongoose";
import {ObjectId} from "mongodb"
import { IConservationDocument } from "./conservation.interface";

export interface IMessageDocument extends Document{
    _id: string | ObjectId,
    sender: string | ObjectId,
    conservation: string | ObjectId,
    content: string,
    files ?: [MessageFileType],
    reads ?: [MessageReadType],
    isDeleted ?: boolean,
    createdAt ?: Date,
    updatedAt ?: Date,

}

export interface MessageFileType{
    type: string,
    url: string
}

export interface MessageReadType{
    user: string | ObjectId,
    isRead: boolean
}

export interface ISendMessageSocket {
    message: IMessageDocument,
    conservation: IConservationDocument
}