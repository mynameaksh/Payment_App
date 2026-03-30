import express from "express";
import { getUser, logout, refreshToken, signin, signup, updateInfo } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router()



router.post("/signup", signup);
router.post("/signin", signin);
router.post("/refresh", authMiddleware, refreshToken);
router.post("/logout", logout);
router.put("/updateInfo", authMiddleware, updateInfo)
router.get("/search", authMiddleware, getUser)


export default router;