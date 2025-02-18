import ListNoteService from "../services/listNoteController";

export class ListNoteController {
  async listNote() {
    const service = new ListNoteService();

    const response = await service.listNote();
    console.log(response)
    return response;
  }
}
