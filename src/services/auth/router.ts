import {Router} from 'express';
const router: Router = Router();

import * as AuthController from "./controller";

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.delete('/logout', AuthController.logout);

export default  router;
