import { prismaClient } from "../../prisma/prisma";

class ListNoteService {
  async listNote(user: string) {
    const prisma = prismaClient;

    const response = await prisma.note.findMany({
      where: {
        userId: user
      }
    });

    if (!response) {
      return null;
    }

    return response;
  }
}

export default ListNoteService;
