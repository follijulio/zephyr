import QuerieUserService from "@/lib/services/user/querieUserService";

class QuerieUserController {
  async querieUser(id: string) {
    const service = new QuerieUserService();

    const response = await service.querieUser(id);

    return response ;
  }
}
export default QuerieUserController;
