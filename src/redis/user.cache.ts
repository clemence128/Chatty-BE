
import { IUserDocument } from "~/interfaces/user.interface";
import { BaseCache } from "./base.cache";

class UserCache extends BaseCache{

    public async addUser(user: IUserDocument): Promise<void> {
        await this.client.set(`user:${user.id}`, JSON.stringify(user));
    }

    public async getUser(userId: string): Promise<IUserDocument | null> {
        const userJSON = await this.client.get(`user:${userId}`);
        if(!userJSON) return null;
        
        return JSON.parse(userJSON);
    }
    
}

export default new UserCache()