import { Router }               from 'express';
import { getAll, updateStatus } from '../../Controller/admin/returnCOntroller.js';

const router = Router();

router.get('/',           getAll);
router.put('/:id/status', updateStatus);

export default router;