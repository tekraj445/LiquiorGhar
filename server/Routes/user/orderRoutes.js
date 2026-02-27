import { Router }                                                from "express";
import authMiddleware                                            from "../../middleware/authMiddleware.js";
import { getOrders, getOrderStats, placeOrder, cancelOrder }    from "../../Controller/user/orderController.js";

const router = Router();
router.get("/stats",        authMiddleware, getOrderStats);
router.get("/",             authMiddleware, getOrders);
router.post("/",            authMiddleware, placeOrder);
router.patch("/:id/cancel", authMiddleware, cancelOrder);
export default router;