import { prismaClient } from "../../prisma/prisma";
import { Note } from "../../types/note";

class QuerieNoteService {
    async querieNote(userId: string, id: string) {
        const prisma = prismaClient;

        const response = await prisma.user.findUnique({
            where: {
                id: userId
            },
        }).notes({
            where: {
                id: id
            }
        });

        const noteData = response?.[0];

        const note = new Note(
            noteData?.note ?? '', 
            noteData?.title ?? '', 
            noteData?.actived ?? false, 
            noteData?.id ?? ''
        );
        

        return note;
    }
}

export default QuerieNoteService;