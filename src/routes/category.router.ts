import * as Categories from "../controllers/category.controller";

import {Router} from 'express';
const router = Router();

router.get('/', Categories.index);
router.get('/:id', Categories.show);
router.post('/', Categories.create)
router.patch('/:id', Categories.update);
router.delete('/:id', Categories.remove);

export default router