import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    firstName : {
        type : String,
        required : true
    },
    middleName : {
        type : String
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    phoneNumber : {
        type : Number,
        required : true,
        min : 1000000000,
        max : 9999999999
    },
    gender : {
        type : String,
        enum : ["Male","Female","others"],
        required : true,
    },
    password : {
        type : String,
        required : true,
        min : 8
    }
})

export const User = mongoose.model("User", userSchema);