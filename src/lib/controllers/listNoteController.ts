import ListNoteService from "../services/listNoteService";

export class ListNoteController {
  async listNote() {
    const service = new ListNoteService();

    const response = await service.listNote();

    return response;
  }
}
