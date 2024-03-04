import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone : {
        type : Number,
        required : true,
    },
    address1 : {
        type : String,
        required : true,
    },
    address2 : {
        type : String,
        required : true,
    },
    city : {
        type : String,
        required : true,
    },
    state : {
        type : String,
        required : true,
    },
    country : {
        type : String,
        required : true,
    },
    pinCode : {
        type : Number,
        required : true,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    }
}, {timestamps : true});

export const Address = mongoose.model("Address", addressSchema);