import { NextFunction, Request, Response } from "express";
import HTTP_STATUS_CODES from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import messageService from "~/services/message.service";

class MessageController{
    public async createMessage(req: Request, res: Response, next: NextFunction): Promise<void>{
        const currentUser = req.currentUser;
        const {conservationId} = req.params;
        const {content} = req.body;

        res.status(HTTP_STATUS_CODES.CREATED).json({
            message: 'Message created',
            data: await messageService.createMessage({content, conservation: conservationId, sender: (currentUser as JwtPayload)._id})
        })
    }
}

export default new MessageController();