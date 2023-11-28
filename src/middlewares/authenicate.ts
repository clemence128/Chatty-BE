import { NextFunction, Request, Response } from "express";
import AppError from "~/core/AppError";
import { AuthJwtPayload } from "~/interfaces/user.interface";
import authService from "~/services/auth.service";
import userService from "~/services/user.service";
import HTTP_STATUS_CODES from "http-status-codes"

const authenicate = async(req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];
    if(!token) throw new AppError("Unauthenticated", HTTP_STATUS_CODES.BAD_REQUEST);
    const decoded: AuthJwtPayload = await authService.verifyAccessToken(token);
    const {userId} = decoded;
    const user = await userService.findById(userId);    
    if(!user) throw new AppError("Something went wrong", HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);

    const authPayload = {_id: user.id, email: user.email, avatar: user.avatar};
    req.currentUser = authPayload;

    next()
}

export default authenicate;