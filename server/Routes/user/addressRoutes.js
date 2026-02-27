import { Router }                                                      from "express";
import authMiddleware                                                   from "../../middleware/authMiddleware.js";
import { getAddresses, addAddress, setDefault, deleteAddress }         from "../../Controller/user/addressController.js";

const router = Router();
router.get("/",              authMiddleware, getAddresses);
router.post("/",             authMiddleware, addAddress);
router.patch("/:id/default", authMiddleware, setDefault);
router.delete("/:id",        authMiddleware, deleteAddress);
export default router;