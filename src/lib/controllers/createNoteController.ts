import { Note } from "@/lib/types/note";
import CreateNoteService from "../services/createNoteService";

export class CreateNoteController {
  async createNote(note: Note) {
    const service = new CreateNoteService();

    console.log("Chamando CreateNoteService...");
    const response = await service.createNote(note);
    console.log("Resposta do serviço:", response);

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
