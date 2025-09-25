import { connection } from "@/dbConnection/dbConnection";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connection();

export async function POST(request: NextRequest) {
  // extract data from token
  const userId = await getDataFromToken(request);
  console.log(userId);

  const user = await User.findById(userId).select("-password");
  return NextResponse.json({
    message: "User found",
    data: user,
  });
}
