import mongoose, { Model } from "mongoose";

const schema = mongoose.Schema;

const bankSchema = new schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },

    //we will store balance in paise not rupees to prevent from  inconsistency
    balance: {
        type: Number,
        default: 1000000000, // for currently we are storing 10000000 in paise = 100000 rupees,
        required: true,


    }

})


export const Bank = mongoose.model("Bank", bankSchema)