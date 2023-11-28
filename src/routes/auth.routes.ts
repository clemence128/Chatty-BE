import { Router } from "express";
import authController from "~/controllers/auth.controller";
import validate from "~/middlewares/validate";
import catchAsync from "~/utils/catchAsync";
import { signIpValidator, signUpValidator } from "~/validations/auth.validation";

const router = Router();

router.post('/signup', validate(signUpValidator), catchAsync(authController.signup))
router.post('/signin', validate(signIpValidator), catchAsync(authController.signin))

export default router;