import { ListNoteController } from "@/lib/controllers/notes/listNoteController";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("\nT");
  try {
    const { id } = await request.json();
    console.log("\n\n\nid: ", id);
    console.log("\n\n\n");
    const controller = new ListNoteController();

    const response = await controller.listNote(id);

    return NextResponse.json(response);
    
  } catch (error) {
    console.error("Erro na rota list:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
