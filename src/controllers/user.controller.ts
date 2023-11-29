import { NextFunction, Request, Response } from "express";
import HTTP_STATUS_CODES from "http-status-codes"
import userService from "~/services/user.service";

class UserController{
    public async getCurrentUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        const currentUser = req.currentUser;

        res.status(HTTP_STATUS_CODES.OK).json({
            message: "Current user",
            data: currentUser
        });
    }

    public async searchUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        const search = req.query.search;

        res.status(HTTP_STATUS_CODES.OK).json({
            message: "Get users",
            data: await userService.searchUser(search as string)
        });
    }
}

export default new UserController();