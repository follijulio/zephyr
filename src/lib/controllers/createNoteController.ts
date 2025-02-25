import { Note } from "@/lib/types/note";
import CreateNoteService from "../services/createNoteService";

export class CreateNoteController {
  async createNote(note: Note) {
    const service = new CreateNoteService();

    const response = await service.createNote(note);

    return response
      ? {
          response: response,
          situation: true,
          message: "Nota criada!"
        }
      : {
          response: null,
          situation: false,
          message: "Erro ao criar nota"
        };
  }
}
