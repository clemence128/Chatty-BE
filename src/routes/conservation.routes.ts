import { Router } from "express";
import { memoryUpload } from "~/configs/multer.config";
import conservationController from "~/controllers/conservation.controller";
import messageController from "~/controllers/message.controller";
import authenicate from "~/middlewares/authenicate";
import validate from "~/middlewares/validate";
import catchAsync from "~/utils/catchAsync";
import { sendMessage, sendMessageWithFiles } from "~/validations/message.validation";

const router = Router();

router.post('/openConservation', catchAsync(authenicate), catchAsync(conservationController.openConservation));
router.get('/', catchAsync(authenicate), catchAsync(conservationController.getConservationsByUser));
router.post('/:conservationId/messages', validate(sendMessage), catchAsync(authenicate), catchAsync(messageController.createMessage));
router.get('/:conservationId/messages', catchAsync(authenicate), catchAsync(messageController.getMessabeByConservation));
router.post('/:conservationId/messagesFile', memoryUpload.array('files'), validate(sendMessageWithFiles), catchAsync(authenicate), catchAsync(messageController.createMessage));

export default router;