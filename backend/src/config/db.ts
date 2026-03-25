import mongoose from "mongoose";
import { MONGO_URL } from "../index.js";

export default async function ConnectDB() {
    try {

        const connection = await mongoose.connect(MONGO_URL)
        if (connection) {
            console.log("Connected to DB");

        }

    } catch (error) {
        console.log(error);

    }
}