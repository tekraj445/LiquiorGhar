import { Router }                        from 'express';
import { getAll, toggleSuspend, remove } from '../../Controller/admin/userController.js';

const router = Router();

router.get('/',            getAll);
router.put('/:id/suspend', toggleSuspend);
router.delete('/:id',      remove);

export default router;