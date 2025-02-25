import { prismaClient } from "../../prisma/prisma";
import { User } from "../../types/user";

class QuerieUserService {
  async querieUser(id: string) {
    const prisma = prismaClient;
    const response = await prisma.user.findUnique({
      where: { id: id }
    });

    const user = new User(
      response?.name ? response?.name : "",
      response?.email ?? "",
      response?.password ?? "",
      response?.id ?? ""
    );

    return user;
  }
}

export default QuerieUserService;