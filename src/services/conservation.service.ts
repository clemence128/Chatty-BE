import AppError from "~/core/AppError";
import { IConservationDocument } from "~/interfaces/conservation.interface";
import conservationRepo from "~/repositories/conservation.repo";
import HTTP_STATUS_CODES from "http-status-codes"

class ConservationService {
    private async conservationPopulate(conservation: IConservationDocument): Promise<IConservationDocument>{
        return conservation.populate('users', "-password -createdAt -updatedAt -email -__v")
                .then((result) => result.populate('creator', '-password -createdAt -updatedAt -email -__v'))
                .then((result) => result.populate('latestMessage', '-__v'))
    }
    public async openConservation({userId, receiverId}: {userId: string, receiverId: string}){
        const existingConservation = await conservationRepo.findConservationByUsers({userId, receiverId});

        if(existingConservation) return await this.conservationPopulate(existingConservation);

        const users = [userId, receiverId];
        const conservation = await conservationRepo.createConservation({users, creator: userId})
        if(!conservation) throw new AppError('Something went wrong', HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);

        return await this.conservationPopulate(conservation);
    }
}

export default new ConservationService();