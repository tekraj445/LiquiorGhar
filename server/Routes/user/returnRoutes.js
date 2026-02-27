import { Router }          from "express";
import authMiddleware      from "../../middleware/authMiddleware.js";
import { requestReturn }   from "../../Controller/user/returnController.js";

const router = Router();
router.post("/", authMiddleware, requestReturn);
export default router;