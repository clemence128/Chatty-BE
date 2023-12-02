import AppError from "~/core/AppError";
import { IMessageDocument } from "~/interfaces/message.interface";
import conservationRepo from "~/repositories/conservation.repo";
import messageRepo from "~/repositories/message.repo";
import HTTP_STATUS_CODES from "http-status-codes"

class MessageService {
    private async messagePopulate(message: IMessageDocument): Promise<IMessageDocument> {
        return await message.populate("sender", "-password -createdAt -updatedAt -__v")
    }

    public async createMessage({content, sender, conservation}: {content: string, sender: string, conservation: string}){
        const message = await messageRepo.createMessage({sender, content, conservation});
        await conservationRepo.updateLatestMessage(message);

        return await this.messagePopulate(message);

    }

    public async getMessageByConservation({conservationId, userId}: {conservationId: string, userId: string}): Promise<IMessageDocument[]>{
        const userInConservation = await conservationRepo.findUserInConservation({conservationId, userId});
        if(!userInConservation) throw new AppError('Forbidden', HTTP_STATUS_CODES.FORBIDDEN)

        const messages = await messageRepo.getMessageByConservation({conservationId});
        const messagesMap = messages.map(async(el) => await this.messagePopulate(el));
        return await Promise.all(messagesMap);
    }
}

export default new MessageService();