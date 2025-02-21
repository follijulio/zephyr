import { prismaClient } from "../prisma/prisma";
import { Note } from "../types/note";

class QuerieNoteService {
    async querieNote(id: string) {
        const prisma = prismaClient;

        const response = await prisma.note.findUnique({
            where: {
                id: id,
            }
        });

        const note = new Note(
            response?.note ? response?.note : '', 
            response?.title ?? '', 
            response?.actived ?? false, 
            response?.id ?? ''
        );
        


        return note;
    }
}

export default QuerieNoteService;