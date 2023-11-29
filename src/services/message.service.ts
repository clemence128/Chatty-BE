import conservationRepo from "~/repositories/conservation.repo";
import messageRepo from "~/repositories/message.repo";

class MessageService {
    public async createMessage({content, sender, conservation}: {content: string, sender: string, conservation: string}){
        const message = await messageRepo.createMessage({sender, content, conservation});
        await conservationRepo.updateLatestMessage(message);

        return message;

    }
}

export default new MessageService();