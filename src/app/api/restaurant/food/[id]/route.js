import { restaurantDbConnection } from "@/lib/db/database";
import Food from "@/models/restaurant/foodItems";
import { NextResponse } from "next/server";

await restaurantDbConnection();

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


export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        const deleted = await Food.findByIdAndDelete(id);
        
        if (!deleted) {
            return NextResponse.json(
                { success: false, message: "Food item not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Food item deleted successfully", success: true }, 
            { status: 200 }
        );
    } catch (error) {
        console.error("Delete error:", error); // Better error logging
        return NextResponse.json(
            { message: error.message, success: false }, 
            { status: 500 }
        );
    }
}

// export async function PUT(req, { params }) {
//     try {        
//         const { id } = await params;
//         const body = await req.json();
        
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return NextResponse.json(
//                 { success: false, message: "Invalid ID format" },
//                 { status: 400 }
//             );
//         }
        
//         const updatedFood = await Food.findByIdAndUpdate(id,body,
//             { 
//                 new: true
//             }
//         );

//         if (!updatedFood) {
//             return NextResponse.json(
//                 { success: false, message: "Food item not found" },
//                 { status: 404 }
//             );
//         }

//         return NextResponse.json(
//             { 
//                 message: "Food item updated successfully", 
//                 success: true,
//                 data: updatedFood  // Return the updated data
//             }, 
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error("Update error:", error);
//         return NextResponse.json(
//             { message: error.message, success: false }, 
//             { status: 500 }
//         );
//     }
// }