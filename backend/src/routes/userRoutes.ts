import express from "express";
import { logout, refreshToken, signin, signup } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router()



router.post("/signup", signup);
router.post("/signin", signin);
router.post("/refresh", authMiddleware, refreshToken);
router.post("/logout", logout);


export default router;