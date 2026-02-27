import { Router }                    from 'express';
import { getAll, getStats, updateStatus } from '../../Controller/admin/orderController.js';

const router = Router();

router.get('/',           getAll);
router.get('/stats',      getStats);
router.put('/:id/status', updateStatus);

export default router;