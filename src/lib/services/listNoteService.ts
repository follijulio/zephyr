import { prismaClient } from "../prisma/prisma";

class ListNoteService {
  async listNote() {
    const prisma = prismaClient;

    const response = await prisma.note.findMany();

    if (!response) {
      return null;
    }
    
    return response;
  }
}

export default ListNoteService;