import MessageModel from "~/models/message.model";

class MessageRepository{
    public async createMessage({sender, conservation, content = '', files = []}: {sender:string, conservation:string, content ?: string, files ?: []}){
        return await MessageModel.create({sender, conservation, content, files});
    }
}

export default new MessageRepository();