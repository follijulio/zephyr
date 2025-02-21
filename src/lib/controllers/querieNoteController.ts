import QuerieNoteService from "../services/querieNoteService";

class QuerieNoteController {
    async querieNoteController(id: string) {
        const service = new QuerieNoteService();

        const response = await service.querieNote(id);

        return response;
        
    }
}

export default QuerieNoteController;