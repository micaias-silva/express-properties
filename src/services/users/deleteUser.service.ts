import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import HTTPError from "../../errors/HTTPError";

const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(Users);
  const userToDelete = await userRepository.findOne({ where: { id: id } });
  if (!userToDelete) {
    throw new HTTPError(404, "User not found");
  }
  if (!userToDelete?.isActive) {
    throw new HTTPError(400, "Can't delete inactive user");
  }
  await userRepository.update({ id: id }, { isActive: false });
  await userRepository.softDelete(id);

  await userRepository.restore(id);
};
export default deleteUserService;
