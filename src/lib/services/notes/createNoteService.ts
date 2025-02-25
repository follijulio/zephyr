import { Note } from "@/lib/types/note";
import { prismaClient } from "../../prisma/prisma";

class CreateNoteService {
  async createNote(note: Note) {
    const prisma = prismaClient;

    const response = await prisma.note.create({
      data: {
        userId: note.userId,
        note: note.note,
        title: note.title,
        actived: note.actived,
      }
    });

    return response;
  }
}

export default CreateNoteService;
