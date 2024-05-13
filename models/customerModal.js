import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const customerSchem=mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    }
})