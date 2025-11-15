import mongoose from "mongoose";
import bcrypt from "bcrypt";

const signUpSchema=new mongoose.Schema({
    restaurantName:{
        type:String,
        required:true
    },
    ownerName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contactNumber:{
        type:String,
        required:true
    },
    city:{
        type:String,
        enum:["Delhi", "Mumbai", "Chennai", "Kolkata"],
        required:true
    },
    restaurantAddress:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
},{ timestamps:true })


// hashed password
signUpSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    try{
        const salt= await bcrypt.genSalt(10);
        this.password =await bcrypt.hash(this.password, salt)
        next();
    }
    catch(error){
        console.log("Hash password error",error)
        next(error);
    }
})

export const Restaurant= mongoose.models.Restaurant || mongoose.model("Restaurant", signUpSchema)