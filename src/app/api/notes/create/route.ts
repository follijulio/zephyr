import { CreateNoteController } from "@/lib/controllers/notes/createNoteController";
import { Note } from "@/lib/types/note";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {


    const { note, title, actived, userId } = await request.json();
  

    if (!note || !title || actived === undefined || !userId) {
      return NextResponse.json(
        { error: "Note, title, and actived status are required" },
        { status: 400 }
      );
    }

    const newNote = new Note(note, title, actived, userId);


    const controller = new CreateNoteController();
    const response = await controller.createNote(newNote);


    return NextResponse.json(response);
  } catch (error) {
    console.error("Erro na rota create:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}