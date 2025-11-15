// app/api/restaurant/logout/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const res = NextResponse.json({ message: "Logout successful", success: true });

    const cookie = `accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax;`;
    res.headers.set("Set-Cookie", cookie);

    return res;
  } catch (err) {
    return NextResponse.json({ message: err.message, success: false }, { status: 500 });
  }
}
