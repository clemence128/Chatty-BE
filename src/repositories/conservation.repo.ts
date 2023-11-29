import { IConservationDocument } from "~/interfaces/conservation.interface";
import ConservationModel from "~/models/conservation.model";
import { ObjectId } from "mongodb";
import { IMessageDocument } from "~/interfaces/message.interface";

class ConseravtionRepository {
    async createConservation({name = '', creator, users, isGroup = false}: {name?: string, creator: string, users: string[], isGroup?: boolean}){
        return await ConservationModel
                    .create({name, creator: new ObjectId(creator), users, isGroup});
    }

    async findConservationById(id: string): Promise<IConservationDocument | null>{
        return await ConservationModel.findById(id);
    }

    async findConservationByUsers({userId, receiverId}:  {userId: string, receiverId: string}): Promise<IConservationDocument | null>{
        return await ConservationModel.findOne({
            isGroup: false, 
            $and: [
                {users: {$elemMatch: {$eq: userId}}}, 
                {users: {$elemMatch: {$eq: receiverId}}}
            ]
        })
    }

    async updateLatestMessage(message: IMessageDocument): Promise<void>{
        await ConservationModel.updateOne({_id: message.conservation}, {latestMessage: message._id});
    }
}

export default new ConseravtionRepository();