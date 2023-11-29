import { Router } from "express";
import userController from "~/controllers/user.controller";
import authenicate from "~/middlewares/authenicate";
import catchAsync from "~/utils/catchAsync";

const router = Router();

router.get('/currentUser', catchAsync(authenicate), userController.getCurrentUser)
router.get('/', catchAsync(authenicate), userController.searchUser)

export default router;
