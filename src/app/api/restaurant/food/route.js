import { restaurantDbConnection } from "@/lib/db/database";
import Food from "@/models/restaurant/foodItems";
import { NextResponse } from "next/server";

restaurantDbConnection();

export async function POST(req) {
    try {
        const body = await req.json();
        // const {restaurantID, foodName, foodPrice, foodImage} = body;

        const addFood = new Food(body);

        await addFood.save();
        return NextResponse.json({ message: "Food item added successfully", success: true }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
}

export async function GET(req) { 
    try {
        const { searchParams } = new URL(req.url);
        const restaurantID = searchParams.get("restaurantID");

        if (!restaurantID) {
            return NextResponse.json(
                { error: 'restaurantID is required', success: false },
                { status: 400 }
            );
        }

        const food = await Food.find({ restaurantID });

        return NextResponse.json({
            message: "Foods fetched successfully",
            success: true, 
            food: food
        }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json(
            { message: error.message, success: false }, 
            { status: 500 }
        );
    }
}