import { getDataFromToken } from "@/helpers/getDataFromToken";
import { restaurantDbConnection } from "@/lib/db/database";
import { Restaurant } from "@/models/restaurant/restaurentSignUpModel";
import { NextResponse } from "next/server";

await restaurantDbConnection();

export async function GET(req) {
    try {
        const userId = await getDataFromToken(req);
        const restaurant = await Restaurant.findOne({ _id: userId })
        return NextResponse.json({ message: "User found", success: true, restaurant }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}