import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { plainToClass } from "class-transformer";
import { User } from "../../interfaces/users";

const listUsersService = async () => {
  const userRepository = AppDataSource.getRepository(Users);
  const users = await userRepository.find();
  const safeUsers = plainToClass(User, users, {
    excludeExtraneousValues: true,
  });
  return safeUsers;
};

export default listUsersService;
