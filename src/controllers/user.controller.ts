import { NextFunction, Request, Response } from "express";
import HTTP_STATUS_CODES from "http-status-codes"

class UserController{
    public async getCurrentUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        const currentUser = req.currentUser;

        res.status(HTTP_STATUS_CODES.OK).json({
            message: "Current user",
            data: currentUser
        });
    }
}

export default new UserController();