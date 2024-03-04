import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName : {
        type : String, 
        required : true,
        trim : true,
    },
    lastName : {
        type : String, 
        trim : true,
    },
    email : {
        type : String, 
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
}, {timestamps : true})

export const User = mongoose.model("User" , userSchema);