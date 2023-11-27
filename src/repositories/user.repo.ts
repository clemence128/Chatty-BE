import { IUserDocument } from "~/interfaces/user.interface";
import UserModel from "~/models/user.model"

class UserRepository {
    findByEmailOrUsername = async(email: string): Promise<IUserDocument | null> => {
        return await UserModel.findOne({email});
    }

    save = async ({name, email, password}: {name: string, email: string, password: string}): Promise<IUserDocument | null> => {
        return await UserModel.create({name, email, password});
    }
}

export default new UserRepository();