import { Router } from "express";
import conservationController from "~/controllers/conservation.controller";
import messageController from "~/controllers/message.controller";
import authenicate from "~/middlewares/authenicate";
import catchAsync from "~/utils/catchAsync";

const router = Router();

router.post('/openConservation', catchAsync(authenicate), catchAsync(conservationController.openConservation));
router.post('/:conservationId/messages', catchAsync(authenicate), catchAsync(messageController.createMessage));

export default router;