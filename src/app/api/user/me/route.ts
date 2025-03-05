import { NextResponse } from "next/server";
import { JwtPayload, verify } from "jsonwebtoken";
import cookie from "cookie";
import { User } from "@/lib/types/user";
import QuerieUserController from "@/lib/controllers/user/querieUserController";

export async function GET(request: Request) {
  console.log("1")
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) {
    return NextResponse.json({ response: null });
  }
  
  console.log("2")
  const cookies = cookie.parse(cookieHeader);
  console.log("3")
  
  const token = cookies.token;
  console.log("4")
  if (!token) {
    return NextResponse.json({ error: "Token not found" }, { status: 400 });
  }
  console.log("5")
  
  let decoded;
  console.log("6")
  
  try {
    decoded = verify(token, process.env.JWT_SECRET!);
    console.log("7")
  } catch (erro) {
    return NextResponse.json(
      { error: `Invalid or expired token | ERROR: ${erro}` },
      { status: 400 }
    );
  }
  console.log("8")
  
  const userId = (decoded as JwtPayload).id;
  console.log("9")
  
  const controller = new QuerieUserController();
  console.log("10")
  
  try {
    const response = (await controller.querieUserById(userId)) as User;
    console.log("11")
    
    if (!response) {
      return NextResponse.json(
        { error: "the user was not found" },
        { status: 404 }
      );
    }
    console.log("12")
    
    //! ERRO AQUI
    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error("Error when searching for user:", error);
    return NextResponse.json(
      { error: "Error when searching for user" },
      { status: 500 }
    );
  }
}
