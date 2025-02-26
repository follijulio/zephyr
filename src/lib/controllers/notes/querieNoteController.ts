import QuerieNoteService from "@/lib/services/notes/querieNoteService";

class QuerieNoteController {
  async querieNoteController(userId: string, idNote: string) {
    const service = new QuerieNoteService();

    const response = await service.querieNote(userId, idNote);

    return response
      ? {
          response: response,
          situation: true,
          message: "Note found"
        }
      : {
          response: null,
          situation: false,
          message: "Error to find note"
        };
  }
}

export default QuerieNoteController;
