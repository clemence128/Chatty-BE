
import { IUserDocument } from "~/interfaces/user.interface";
import { BaseCache } from "./base.cache";

class UserCache extends BaseCache{

    public async addUser(user: IUserDocument): Promise<void> {
        if(!this.client.isOpen) await this.client.connect();

        await this.client.set(`user:${user.id}`, JSON.stringify(user));
    }
    
}

export default new UserCache()