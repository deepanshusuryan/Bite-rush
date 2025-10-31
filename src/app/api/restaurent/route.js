import databaseConnection from "@/lib/db/database";
import { NextResponse } from "next/server";

export async function GET(){
    databaseConnection();
    return NextResponse.json({result:true})
}