import { restaurantDbConnection } from "@/lib/db/database";
import { Restaurant } from "@/models/restaurant/restaurentSignUpModel";
import { NextResponse } from "next/server";

await restaurantDbConnection();

export async function POST(req) {
    try {
        const body = await req.json();
        const { restaurantName, ownerName, email, contactNumber, city, restaurantAddress, password } = body;

        const user = await Restaurant.findOne({ email });
        if (user) {
            return NextResponse.json({ message: "User alredy exists" }, { status: 401 })
        }

        const SignUp = new Restaurant({ restaurantName, ownerName, email, contactNumber, city, restaurantAddress, password });
        await SignUp.save();

        // send verification mail
        // await sendMail({ email, emailType: "VERIFY", restaurantID: SignUp._id })

        return NextResponse.json({ message: "Restaurent regstration successfull", success: true, SignUp }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}