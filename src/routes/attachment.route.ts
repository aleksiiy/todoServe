import {Router} from "express"
const router = Router();

import * as AttachmentsController from "../controllers/attachment.controller";

router.post('/', AttachmentsController.create);
router.get('/:id', AttachmentsController.show);
router.patch('/:id', AttachmentsController.update);
router.delete('/:id', AttachmentsController.remove);

export default router;
