import { ListNoteController } from "@/lib/controllers/listNoteController";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Recebendo requisição...");
    const controller = new ListNoteController();

    const response = await controller.listNote();
    console.log('ROUTE: '+response)
    return NextResponse.json(response);
    
  } catch (error) {
    console.error("Erro na rota list:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
