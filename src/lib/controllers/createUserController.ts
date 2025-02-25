import { CreateUserService } from "../services/createUserService";
import { User } from "../types/user";

export class CreateUserController {
  async createUser(user: User) {
    const service = new CreateUserService();

    const response = await service.createUser(user);

    
    return response
      ? {
          response: response,
          situation: true,
          message: "Usuário criado!"
        }
      : {
          response: null,
          situation: false,
          message: "Erro ao criar usuário"
        };
  }
}
