import { Router }                                                          from "express";
import authMiddleware                                                       from "../../middleware/authMiddleware.js";
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart }   from "../../Controller/user/cartController.js";

const router = Router();
router.get("/",              authMiddleware, getCart);
router.post("/",             authMiddleware, addToCart);
router.put("/:productId",    authMiddleware, updateCartItem);
router.delete("/:productId", authMiddleware, removeFromCart);
router.delete("/",           authMiddleware, clearCart);
export default router;