import ListNoteService from "../../services/notes/listNoteService";

export class ListNoteController {
  async listNote(id: string) {
    const service = new ListNoteService();

    const response = await service.listNote(id);

    return response
      ? {
          response: response,
          situation: true,
          message: "Notes found"
        }
      : {
          response: null,
          situation: false,
          message: "Error to find notes"
        };
  }
}
