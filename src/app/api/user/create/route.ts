import { CreateUserController } from "@/lib/controllers/createUserController";
import { NextResponse } from "next/server";
import { User } from "@/lib/types/user";
export async function POST(request: Request) {
  const userController = new CreateUserController();

  try {

    const { name, email, password } = await request.json();


    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }

    const newUser = new User(name, email, password, "", []);
    
    const response = await userController.createUser(newUser);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Erro na rota create:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
