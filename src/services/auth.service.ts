import jwt, { JsonWebTokenError } from "jsonwebtoken";
import config from "~/config";
import HTTP_STATUS_CODES from "http-status-codes"
import AppError from "~/core/AppError";
import userRepo from "~/repositories/user.repo";

class AuthService{

    private generateAccessToken(userId: string): Promise<string | JsonWebTokenError>{
        return new Promise<string>((reslove, reject) => {
            jwt.sign({userId}, config.ACCESS_TOKEN_SECRET, {expiresIn: config.ACCESS_TOKEN_EXPIRE}, (err, token) => {
                if(err) return reject(err);
                reslove(token as string);
            })
    })};

    private generateRefreshToken(userId: string): Promise<string>{
        return new Promise<string>((reslove, reject) => {
            jwt.sign({userId}, config.REFRESH_TOKEN_SECRET, {expiresIn: config.REFRESH_TOKEN_EXPIRE}, (err, token) => {
                if(err) return reject(err);

                reslove(token as string);
            })

        })
    }

    public async signup({name, email, password}: {name: string, email: string, password: string}): Promise<any>{
        const existingUser = await userRepo.findByEmailOrUsername(email);
        if(existingUser) throw new AppError("This email is already in use.", HTTP_STATUS_CODES.BAD_REQUEST);

        const user = await userRepo.save({name, email, password});
        
        if(!user) throw new AppError("Something went wrong", HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);

        const [accessToken, refreshToken] = await Promise.all([this.generateAccessToken(user._id.toString()), this.generateRefreshToken(user._id.toString())]);

        return {
            user,
            token: {
                accessToken,
                refreshToken,
            }
        }
    }
}

export default new AuthService();