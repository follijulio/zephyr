import QuerieNoteController from "@/lib/controllers/user/querieUserController";
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import cookie from "cookie";


export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const controller = new QuerieNoteController();
    const responseController = await controller.authUser(email, password);

    const user = responseController.response ? responseController.response : responseController;

    if (!user) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    const token = sign(
      { id: responseController.response?.id , email: responseController.response?.email },
      process.env.JWT_SECRET!,
      { expiresIn: '4h' }
    );

    const serializedCookie = cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    });

    return NextResponse.json(
      { user },
      { status: 200, headers: { 'Set-Cookie': serializedCookie } }
    );
  } catch (error) {
    console.error("Erro na rota de login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
