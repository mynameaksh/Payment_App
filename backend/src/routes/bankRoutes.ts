import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { balance, transfer } from "../controllers/bankController.js";


const router = express.Router();


router.get("/balance", authMiddleware, balance)
router.post("/transfer", authMiddleware, transfer)

export default router;