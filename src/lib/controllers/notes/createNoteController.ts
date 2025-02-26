import CreateNoteService from "@/lib/services/notes/createNoteService";
import { Note } from "@/lib/types/note";

export class CreateNoteController {
  async createNote(note: Note) {
    const service = new CreateNoteService();

    const response = await service.createNote(note);

    return response
      ? {
          response: response,
          situation: true,
          message: "Note created"
        }
      : {
          response: null,
          situation: false,
          message: "Erro to create note"
        };
  }
}
