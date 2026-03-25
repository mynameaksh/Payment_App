import express from "express";
import ConnectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import cors from "cors"

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config()

export const MONGO_URL = process.env.MONGO_URL

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))




app.use("/api/v1", userRoutes);



app.listen(3000, () => {


    ConnectDB()
    console.log("PORT running on 3000");

})