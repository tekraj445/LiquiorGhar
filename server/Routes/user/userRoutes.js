import { Router }     from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import { register, login, getProfile as getMe } from "../../Controller/authcontroller.js";

const router = Router();
router.post("/register", register);
router.post("/login",    login);
router.get("/me",        authMiddleware, getMe);
export default router;