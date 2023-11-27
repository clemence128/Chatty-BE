import { NextFunction, Request, Response } from "express";
import HTTP_STATUS_CODES from "http-status-codes";
import authService from "~/services/auth.service";

class AuthController {
    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {password, email, name} = req.body;

        res.status(HTTP_STATUS_CODES.CREATED).json({
            message: "Signup successfully",
            data: await authService.signup({name, password, email})
        })
    }
}

export default new AuthController();