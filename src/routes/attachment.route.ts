import {Router} from "express"
const router = Router();

import * as AttachmentsController from "../controllers/attachment.controller";
import upload from "../middlewares/upload.middleware";

router.post('/', upload.array("files"), AttachmentsController.create);
router.get('/:id', AttachmentsController.show);
router.patch('/:id', upload.array("files"), AttachmentsController.update);
router.delete('/:id', AttachmentsController.remove);

export default router;
