import { type Response } from "express";
import type { AuthRequest } from "../middlewares/authMiddleware.js";
import { Bank } from "../schema/bankSchema.js";
import mongoose from "mongoose";
import z from "zod";


export const balance = async (req: AuthRequest, res: Response) => {

    try {

        const userId = req.user?.userId

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorised"
            })
        }
        let account = await Bank.findOne({
            userId
        })

        if (!account) {
            account = await Bank.create({
                userId
            })
        }

        return res.status(200).json({
            balance: account.balance
        })
    } catch (error) {
        return res.json({
            message: error
        })
    }


}

export const transfer = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const transferBody = z.object({
        amount: z.number().int().positive(),
        to: z.string()
    })

    const result = transferBody.safeParse(req.body)
    if (!result.success) {
        return res.status(400).json({
            message: "Invalid transfer payload"
        })
    }

    const { amount, to } = result.data

    if (!mongoose.Types.ObjectId.isValid(to)) {
        return res.status(400).json({
            message: "Invalid receiver id"
        })
    }

    if (to === userId) {
        return res.status(400).json({
            message: "Cannot transfer to your own account"
        })
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const account = await Bank.findOne({ userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            })
        }

        const toAccount = await Bank.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction()
            return res.status(404).json({
                message: "Receiver account not found"
            })
        }

        await Bank.updateOne({ userId }, { $inc: { balance: -amount } }).session(session)
        await Bank.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session)

        await session.commitTransaction();
        return res.status(200).json({
            message: "Transaction completed"
        })
    } catch (error) {
        await session.abortTransaction();
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    } finally {
        session.endSession();
    }

}
