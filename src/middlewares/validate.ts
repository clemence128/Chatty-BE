import { NextFunction, Request } from "express";
import HTTP_STATUS_CODES from "http-status-codes";
import joi, {ValidationError} from "joi";
import AppError from "~/core/AppError";

const validate = (validationSchema: joi.ObjectSchema): any  => {
    return async(req: Request, res: Response, next: NextFunction) => {
        try{
            await validationSchema.validateAsync(req.body)
            next()
        }
        catch(error){
            next(new AppError((error as ValidationError).details[0].message, HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY))
        }
    }
}

export default validate;