import { IUserDocument } from "~/interfaces/user.interface";
import userRepo from "~/repositories/user.repo";

class UserService{
    public async findById(id: string): Promise<IUserDocument | null>{
        return await userRepo.findById(id);
    }
}

export default new UserService();