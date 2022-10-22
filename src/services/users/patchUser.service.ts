import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { IUserUpdate } from "../../interfaces/users";
import { hash } from "bcrypt";
import "dotenv/config";
import HTTPError from "../../errors/HTTPError";

const patchUserService = async (id: string, data: IUserUpdate) => {
  const userRepository = AppDataSource.getRepository(Users);
  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    throw new HTTPError(404, "User not found");
  }

  if (data.password) {
    const hashedPassword = await hash(data.password, 10);
    data.password = hashedPassword;
  }
  await userRepository.update({ id: id }, { ...data });
};

export default patchUserService;
