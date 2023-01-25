import * as UserController from "../controllers/user.controller";

import {Router} from 'express';
const router = Router();

router.get('/', UserController.my);
router.patch("/:", UserController.update);

export default router;
