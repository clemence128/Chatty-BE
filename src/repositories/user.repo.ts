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

    searchUser = async (search: string): Promise<IUserDocument[]> => {
        return await UserModel.find({
            name: {$regex: search, $options: "i"}
        })
    }
}

export default new UserRepository();