import QuerieNoteService from "@/lib/services/notes/querieNoteService";

class QuerieNoteController {
    async querieNoteController(userId: string, idNote: string) {
        const service = new QuerieNoteService();

        const response = await service.querieNote(userId, idNote);
        return response;
    }
}

export default QuerieNoteController;