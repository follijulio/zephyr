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
        notes: {
          create: {
            actived: true,
            title: "Nota de exemplo",
            note: "Esta é uma nota de exemplo"
          }
        }
      }
    });
    
    return response;
  }
}

export { CreateUserService };
