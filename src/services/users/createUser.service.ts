import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { IUser, IUserRequest, User } from "../../interfaces/users";
import { hash } from "bcrypt";
import { plainToClass } from "class-transformer";
import HTTPError from "../../errors/HTTPError";

const createUserService = async ({
  name,
  email,
  password,
  isAdm = false,
}: IUserRequest): Promise<IUser | undefined> => {
  const userRepository = AppDataSource.getRepository(Users);
  const emailAlreadyExists = await userRepository.findOne({ where: { email } });

  if (emailAlreadyExists) {
    throw new HTTPError(409, "Email already exists");
  }

  const hashedPassword = await hash(password, 10);

  const newUser = userRepository.create({
    name,
    email,
    password: hashedPassword,
    isAdm,
  });

  await userRepository.save(newUser);

  return plainToClass(User, newUser, { excludeExtraneousValues: true });
};

export default createUserService;
