import { restaurantDbConnection } from "@/lib/db/database";
import { NextResponse } from "next/server";
import { restaurantSignUp } from "@/models/restaurant/restaurentSignUpModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body ?? {};

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required", success: false },
        { status: 400 }
      );
    }

    // Ensure JWT secret present
    if (!JWT_ACCESS_SECRET) {
      console.error("Missing JWT_ACCESS_SECRET env var");
      return NextResponse.json(
        { message: "Server configuration error", success: false },
        { status: 500 }
      );
    }

    // Connect to DB
    await restaurantDbConnection();

    // Find user
    const restaurant = await restaurantSignUp.findOne({ email: email.toLowerCase() });
    if (!restaurant) {
      return NextResponse.json(
        { message: "User with this email doesn't exist", success: false },
        { status: 401 }
      );
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, restaurant.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid password", success: false },
        { status: 401 }
      );
    }

    // Generate access token
    const accessToken = jwt.sign(
      { id: restaurant._id.toString(), email: restaurant.email },
      JWT_ACCESS_SECRET,
      { expiresIn: "1h" }
    );

    // return response (IMPORTANT: return the NextResponse)
    return NextResponse.json(
      {
        message: "Login successful",
        success: true,
        accessToken,
        restaurant: {
          email: restaurant.email,
          name: restaurant.restaurantName,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // log full error server-side for debugging
    console.error("Login error:", error);
    return NextResponse.json(
      { message: error?.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
