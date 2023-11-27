import { Model, Schema, model } from "mongoose";
import { IUserDocument } from "~/interfaces/user.interface";
import {compare, hash} from "bcrypt"

const SALT_ROUND = 10

const userSchema = new Schema<IUserDocument>({
    password: {type: String},
    name: {type: String},
    email: {type: String, unique: true},
    avatar: {type: String, default: 'https://res.cloudinary.com/dfrp35blc/image/upload/v1701065630/profile-default-svgrepo-com_jwc0pc.svg'},
    createdAt: {type: Date, default: Date.now},
}, {
    toJSON: {
        transform(_doc, ret){
            delete ret.password;
            return ret;
        }
    }
})

userSchema.pre('save', async function(next){
    const hashedPassword: string = await hash(this.password as string, SALT_ROUND)
    this.password = hashedPassword;
    next()
})

userSchema.methods.comparePassword = async function(password: string): Promise<boolean>{
    const hashedPassword: string = this.password;

    return await compare(password, hashedPassword)
}

userSchema.methods.hashPassword = async function(password: string): Promise<string>{
    return await hash(password, SALT_ROUND);
}

const UserModel: Model<IUserDocument> = model<IUserDocument>("User", userSchema);

export default UserModel;