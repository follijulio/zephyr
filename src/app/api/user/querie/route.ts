import QuerieNoteController from "@/lib/controllers/user/querieUserController";
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import cookie from "cookie";

export async function POST(request: Request) {
  console.log("1")
  try {
    const { email, password } = await request.json();
    console.log("2", {email, password})
    
    if (!email || !password) {
      // Corrigindo a mensagem de erro para refletir os campos validados
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 });
    }

    const controller = new QuerieNoteController();
    const response = await controller.querieUser(email, password);
    
    if (!response) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    
    const token = sign({ id: response.response?.id , email: response.response?.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });

   
    const headers = new Headers();
    headers.set('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,                             
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',                          
      maxAge: 3600,                                
      path: '/',                                   
    }));


    return NextResponse.json(response);
  

  } catch (error) {
    console.error("Erro na rota querie:", error);
    return NextResponse.json(
      { error: "Internal Server Error: " + error },
      { status: 500 }
    );
  }
}
