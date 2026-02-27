import { Router }                              from "express";
import authMiddleware                          from "../../middleware/authMiddleware.js";
import { getNotifications, markRead }          from "../../Controller/user/notificationController.js";

const router = Router();
router.get("/",           authMiddleware, getNotifications);
router.patch("/:id/read", authMiddleware, markRead);
export default router;