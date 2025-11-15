import mongoose from "mongoose";
import { Restaurant } from "./restaurentSignUpModel";

const foodSchema=new mongoose.Schema({
    restaurantID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant",
        required:true
    },
    foodName:{
        type:String,
        required:true,
    },
    foodPrice:{
        type:String,
        required:true
    },
    foodImage:{
        type:String,
        required:true
    }
},{timestamps:true});

const Food=mongoose.models.foodSchema || mongoose.model("foodSchema",foodSchema);

export default Food