import { restaurantDbConnection } from "@/lib/db/database";
import { NextResponse } from "next/server";
import { Restaurant } from "@/models/restaurant/restaurentSignUpModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

await restaurantDbConnection();
const JWT_ACCESS_SECRET=process.env.JWT_ACCESS_SECRET;

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required", success: false },
        { status: 400 }
      );
    }

    const restaurant = await Restaurant.findOne({ email });
    if (!restaurant) {
      return NextResponse.json(
        { message: "User with this email doesn't exist", success: false },
        { status: 401 }
      );
    }

    const validPassword = await bcrypt.compare(password, restaurant.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid password", success: false },
        { status: 401 }
      );
    }

    const accessToken = jwt.sign({ id: restaurant._id, email: restaurant.email },
      JWT_ACCESS_SECRET,
      { expiresIn: "1d" }
    );

    const response= NextResponse.json(
      {
        message: "Login successful",
        success: true,
        // accessToken,
        // restaurant: {
        //   email: restaurant.email,
        //   name: restaurant.restaurantName,
        //   id:restaurant._id
        // },
      },
      { status: 200 }
    );

    response.cookies.set("accessToken", accessToken)

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: error?.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
