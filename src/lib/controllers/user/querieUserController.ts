import QuerieUserService from "@/lib/services/user/querieUserService";



class QuerieUserController {
  async querieUser(email: string, password: string) {
    const service = new QuerieUserService();

    const response = await service.querieUser(email, password);

    return response
      ? {
          response: response,
          situation: true,
          message: "User found"
        }
      : {
          response: null,
          situation: false,
          message: "Error to find user"
        };
  }
}
export default QuerieUserController;
