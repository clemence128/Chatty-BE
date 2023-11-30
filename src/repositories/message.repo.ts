import { IMessageDocument } from "~/interfaces/message.interface";
import MessageModel from "~/models/message.model";

class MessageRepository{
    public async createMessage({sender, conservation, content = '', files = []}: {sender:string, conservation:string, content ?: string, files ?: []}){
        return await MessageModel.create({sender, conservation, content, files});
    }

    public async getMessageByConservation({conservationId, limit = 50, page = 1}: {conservationId: string, limit ?: number, page ?: number}): Promise<IMessageDocument[]>{
        return await MessageModel.find({conservation: conservationId});
    }
}

export default new MessageRepository();