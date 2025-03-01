import { NextResponse } from "next/server";
import { JwtPayload, verify } from "jsonwebtoken";
import cookie from "cookie";
import { User } from "@/lib/types/user";
import QuerieUserController from "@/lib/controllers/user/querieUserController";

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) {
    return NextResponse.json({ error: "No cookies found" }, { status: 401 });
  }

  const cookies = cookie.parse(cookieHeader);
  const token = cookies.token;
  if (!token) {
    return NextResponse.json({ error: "Token not found" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = verify(token, process.env.JWT_SECRET!);
  } catch (erro) {
    return NextResponse.json(
      { error: `Invalid or expired token | ERROR: ${erro}` },
      { status: 401 }
    );
  }

  const userId = (decoded as JwtPayload).id;

  const controller = new QuerieUserController();

  try {
    const response = (await controller.querieUserById(userId)) as User;

    if (!response) {
      return NextResponse.json(
        { error: "the user was not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error("Error when searching for user:", error);
    return NextResponse.json(
      { error: "Error when searching for user" },
      { status: 500 }
    );
  }
}
