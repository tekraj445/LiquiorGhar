import { Router }                                              from "express";
import authMiddleware                                          from "../../middleware/authMiddleware.js";
import { getWishlist, addToWishlist, removeFromWishlist }     from "../../Controller/user/wishlistController.js";

const router = Router();
router.get("/",              authMiddleware, getWishlist);
router.post("/",             authMiddleware, addToWishlist);
router.delete("/:productId", authMiddleware, removeFromWishlist);
export default router;