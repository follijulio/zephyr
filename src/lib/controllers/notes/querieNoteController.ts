import QuerieUserController from "../user/querieUserController"; 


class QuerieNoteController {
    async querieNoteController(id: string) {
        const service = new QuerieUserController();
        const response = await service.querieUser(id);
        return response;
    }
}

export default QuerieNoteController;