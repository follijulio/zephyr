import { prismaClient } from "../../prisma/prisma";
import { User } from "../../types/user";

class QuerieUserService {
  async querieUser(email: string, password: string) {
    const prisma = prismaClient;

    const response = await prisma.user.findUnique({
      where: { 
        email: email,
        password: password
       }
    });

    if(!response) {
      return null;
    }
    
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