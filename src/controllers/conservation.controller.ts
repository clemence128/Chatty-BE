import { NextFunction, Request, Response } from "express";
import HTTP_STATUS_CODES from "http-status-codes"
import { AuthPayload } from "~/interfaces/user.interface";
import conservationService from "~/services/conservation.service";

class ConservationController {
    public async openConservation(req: Request, res: Response, next: NextFunction): Promise<void>{
        const currentUser = req.currentUser;
        const {receiverId} = req.body;

        res.status(HTTP_STATUS_CODES.OK).json({
            message: "Open conservation successfully",
            data: await conservationService.openConservation({userId: (currentUser as AuthPayload)._id, receiverId})
        })
    }

    public async getConservationsByUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        const currentUser = req.currentUser;

        res.status(HTTP_STATUS_CODES.OK).json({
            message: "Conservations by user",
            data: await conservationService.getConservationsByUser((currentUser as AuthPayload)._id)
        })
    }
}

export default new ConservationController()