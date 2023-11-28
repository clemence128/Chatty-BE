import { IUserDocument } from "~/interfaces/user.interface";
import UserModel from "~/models/user.model"

class UserRepository {
    findByEmail = async(email: string): Promise<IUserDocument | null> => {
        return await UserModel.findOne({email});
    }

    findById = async(id: string): Promise<IUserDocument | null> => {
        return await UserModel.findById(id);
    }

    save = async ({name, email, password}: {name: string, email: string, password: string}): Promise<IUserDocument | null> => {
        return await UserModel.create({name, email, password});
    }
}

export default new UserRepository();