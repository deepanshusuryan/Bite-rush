import { restaurantDbConnection } from "@/lib/db/database";
import { restaurantSignUp } from "@/models/restaurant/restaurentSignUpModel";
import { NextResponse } from "next/server";


export async function GET(){
    return NextResponse.json({result:true})
}

export async function POST(req){
    try {
        const payload= await req.json();
        await restaurantDbConnection();
        const SignUp=new restaurantSignUp(payload);
        await SignUp.save();
        return NextResponse.json({message:"Restaurent regstration successfull",success:true, SignUp},{status:201})
    } catch (error) {
        return NextResponse.json({message:error.message},{status:500})
    }
}