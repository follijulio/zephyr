import QuerieNoteController from "@/lib/controllers/user/querieUserController";
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import cookie from "cookie";
import { Response } from "@/lib/types/response";


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
      const response = new Response(null, false, 'not login')
      return NextResponse.json({response});
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
    
    
    

    
    const response = new Response(user, true, 'login')

    return NextResponse.json(
      { response },
      {headers: { 'Set-Cookie': serializedCookie } }
    );
  } catch (error) {
    console.error("Erro na rota de login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
