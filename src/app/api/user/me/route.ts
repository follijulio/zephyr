// Exemplo: app/api/user/me/route.ts
import { NextResponse } from "next/server";
import { JwtPayload, verify } from "jsonwebtoken";
import cookie from "cookie";
import { prismaClient } from "@/lib/prisma/prisma"; // Adjust the import path as necessary


export async function GET(request: Request) {
  // 1. Lê o header "cookie" da requisição
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) {
    return NextResponse.json(
      { error: "Nenhum cookie encontrado" },
      { status: 401 }
    );
  }

  // 2. Faz o parsing do cookie para obter o token
  const cookies = cookie.parse(cookieHeader);
  const token = cookies.token;
  if (!token) {
    return NextResponse.json(
      { error: "Token não encontrado" },
      { status: 401 }
    );
  }

  // 3. Decodifica o token usando a chave secreta
  let decoded;
  try {
    decoded = verify(token, process.env.JWT_SECRET!);
  } catch (erro) {
    return NextResponse.json(
      { error: `Token inválido ou expirado ${erro}`, },
      { status: 401 }
    );
  }

  // 4. Extrai o ID do usuário a partir do token decodificado
  const userId = (decoded as JwtPayload).id;

  try {
    // 5. Usa o ID para buscar as informações do usuário no banco
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao buscar usuário" },
      { status: 500 }
    );
  }
}
