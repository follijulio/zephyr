import { prismaClient } from "../prisma/prisma";
import { User } from "../types/user";

class CreateUserService {
  async createUser(user: User) {
    const prisma = prismaClient;

    const response = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        id: user.id,
      },
    });

    return response;
  }
}

export { CreateUserService };