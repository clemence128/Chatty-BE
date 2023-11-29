import { Router } from "express";
import conservationController from "~/controllers/conservation.controller";
import authenicate from "~/middlewares/authenicate";
import catchAsync from "~/utils/catchAsync";

const router = Router();

router.post('/openConservation', catchAsync(authenicate), catchAsync(conservationController.openConservation));

export default router;