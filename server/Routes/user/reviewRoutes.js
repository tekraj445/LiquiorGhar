import { Router }                          from "express";
import authMiddleware                      from "../../middleware/authMiddleware.js";
import { addReview, getProductReviews }    from "../../Controller/user/reviewController.js";

const router = Router();
router.get("/:productId", getProductReviews);
router.post("/",          authMiddleware, addReview);
export default router;