import QuerieUserService from "@/lib/services/user/querieUserService";

class QuerieUserController {
  async querieUserById(user_id: string) {
    const service = new QuerieUserService();

    const response = await service.querieUserById(user_id);

    return response;
  }

  async authUser(email: string, password: string) {
    const service = new QuerieUserService();

    const response = await service.authUser(email, password);

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
