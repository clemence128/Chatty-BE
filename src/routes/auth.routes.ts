import { Router } from "express";
import authController from "~/controllers/auth.controller";
import validate from "~/middlewares/validate";
import catchAsync from "~/utils/catchAsync";
import { signUpValidator } from "~/validations/auth.validation";

const router = Router();

router.post('/signup', validate(signUpValidator), catchAsync(authController.signup))

export default router;