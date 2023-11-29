import { IUserDocument } from "~/interfaces/user.interface";
import userCache from "~/redis/user.cache";
import userRepo from "~/repositories/user.repo";

class UserService{
    public async findById(id: string): Promise<IUserDocument | null>{
        const existingUser = await userCache.getUser(id);
        
        if(!existingUser){
            const user = await userRepo.findById(id);
            if(!user) return null;
            userCache.addUser(user);
        }

        return existingUser;
    }
}

export default new UserService();