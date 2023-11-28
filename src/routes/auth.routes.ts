import { Router } from "express";
import authController from "~/controllers/auth.controller";
import validate from "~/middlewares/validate";
import catchAsync from "~/utils/catchAsync";
import { refreshTokenValidator, signInValidator, signUpValidator } from "~/validations/auth.validation";

const router = Router();

router.post('/signup', validate(signUpValidator), catchAsync(authController.signup))
router.post('/signin', validate(signInValidator), catchAsync(authController.signin))
router.post('/refreshToken', validate(refreshTokenValidator), catchAsync(authController.handleRefreshToken))

export default router;