import { CreateNoteController } from "@/lib/controllers/createNoteController";
import { Note } from "@/lib/types/note";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    console.log("Recebendo requisição...");

    const { note, title, actived } = await request.json();
    console.log("Dados recebidos:", { note, title, actived });

    if (!note || !title || actived === undefined) {
      console.log("Erro: Campos obrigatórios faltando");
      return NextResponse.json(
        { error: "Note, title, and actived status are required" },
        { status: 400 }
      );
    }

    const newNote = new Note(note, title, actived, '');
    console.log("Nova nota criada:", newNote);

    const controller = new CreateNoteController();
    const response = await controller.createNote(newNote);

    console.log("Resposta da controller:", response);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Erro na rota create:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
