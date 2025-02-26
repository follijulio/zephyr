import QuerieNoteController from "@/lib/controllers/notes/querieNoteController";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, idNote } = await request.json();

    if (userId === undefined || idNote === undefined) {
      return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }
    const controller = new QuerieNoteController();
    const response = await controller.querieNoteController(userId, idNote);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Erro na rota querie:", error);
    return NextResponse.json(
      { error: "Internal Server Error" + error },
      { status: 500 }
    );
  }
}
