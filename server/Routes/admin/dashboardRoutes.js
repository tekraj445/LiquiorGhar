import { Router }           from 'express';
import { getStats, getRecentOrders } from '../../Controller/admin/dashboardController.js';

const router = Router();

router.get('/stats',          getStats);
router.get('/recent-orders',  getRecentOrders);

export default router;