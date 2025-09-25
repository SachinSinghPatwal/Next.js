import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
  iat?: number;
  exp?: number;
}

export const getDataFromToken = (request: NextRequest): string | null => {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return null;

    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    ) as DecodedToken;
    console.log("decoded", decodedToken);

    return decodedToken.id;
  } catch (error: any) {
    console.error("JWT verification error:", error.message);
    return null;
  }
};
