import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken"

export interface JwtPayload {
    userId: string;
    username: string;
}

export interface AuthRequest extends Request {
    user?: JwtPayload;
}
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorised"
            })
        }

        const token = authHeader.split(" ")[1];


        if (!token) {
            return res.json({
                message: "token missing"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

        req.user = decoded
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}
