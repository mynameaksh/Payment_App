import mongoose from "mongoose";
import { lowercase, maxLength, minLength, trim } from "zod";


const schema = mongoose.Schema;


const userSchema = new schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30

    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        trim: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})

export const User = mongoose.model('User', userSchema)