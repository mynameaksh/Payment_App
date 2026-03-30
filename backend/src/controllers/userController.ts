import type { Request, Response } from "express";
import { User } from "../schema/userSchema.js";
import { Bank } from "../schema/bankSchema.js";
import z from "zod";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateToken.js";
import type { AuthRequest } from "../middlewares/authMiddleware.js";

interface MyTokenPayload {
    userId: string;
    iat: number;
    exp: number;
}

const userSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(6),
    firstName: z.string().min(3),
    lastName: z.string().min(3)
})

export const signup = async (req: Request, res: Response) => {

    try {

        const result = userSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                errors: result.error
            });
        }
        const { username, password, firstName, lastName } = result.data

        const user = await User.findOne({
            username
        })

        if (user) {
            return res.status(200).json({
                message: "User already Exists",
                success: true
            })
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const createdUser = await User.create({
            username,
            password: hashedPassword,
            firstName,
            lastName
        });

        await Bank.create({
            userId: createdUser._id
        })

        const userId = createdUser._id;
        const { accessToken, refreshToken } = generateToken(userId)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        })


        res.json({
            message: "User Created In completely",
            accessToken,
            userId
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}



export const signin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                message: "Invalid Input",
                success: false
            })
        }

        const user = await User.findOne({
            username
        })

        if (!user) {
            return res.status(400).json({
                message: "User Not Found",
                success: false
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid Password",
                success: false
            })
        }

        const userId = user._id;
        const { accessToken, refreshToken } = generateToken(userId)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        })


        res.json({
            message: "User Logged In completely",
            accessToken,
            userId
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }


}


export const refreshToken = (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;

    if (!token) return res.status(401).json({ message: "No refresh Token Present" });

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET) as MyTokenPayload;

        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: "15m" })

        res.json({ accessToken });
    } catch (error) {
        res.status(403).json({
            message: `Some error Occurred ${error}`
        })
    }
}



export const logout = (req: Request, res: Response) => {
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out" });
};

//zod schema for updatingINfo
const updateBody = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})


export const updateInfo = async (req: AuthRequest, res: Response) => {

    const result = updateBody.safeParse(req.body); //the result will be an object always
    if (!result.success) {
        return res.json({
            message: "Enter info competely and correctly"
        })
    }
    if (Object.keys(result.data).length === 0) {
        return res.status(400).json({ message: "No fields provided to update" });
    }


    const updatedDocument = await User.updateOne({ _id: req.user?.userId },// filter
        //update
        { $set: result.data })


    res.json({
        updatedDocument,
        message: "Updated Document"
    })
}




export const getUser = async (req: AuthRequest, res: Response) => {
    try {
        //getting the value from query parameter URL
        const search = req.query.q || ""; "THE EMPTY STRING WILL HELP YU TO GET ALL THE USERS "

        const foundUser = await User.find({
            username: { $regex: `^${search}`, $options: "i" } //^ = IT MATCXHES WITH THE INPUT OR EMPTY VALUE 
        })
        if (!foundUser) {
            return res.json({
                message: "User not found"
            })
        }

        return res.status(200).json({
            user: foundUser.map(u => ({
                username: u.username,
                firstName: u.firstName,
                lastName: u.lastName,
                _id: u._id
            }))

        })
    } catch (error) {
        res.json({
            message: error
        })
    }

}
