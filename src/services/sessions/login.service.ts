import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { IUserLogin } from "../../interfaces/users";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";
import HTTPError from "../../errors/HTTPError";

const loginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(Users);

  const SECRET = process.env.SECRET_KEY as string;
  const user = await userRepository.findOne({ where: { email: email } });

  if (!user) {
    throw new HTTPError(403, "Invalid email/password entry");
  }

  const passwordMatch = compareSync(password, user.password);
  if (!passwordMatch) {
    throw new HTTPError(403, "Invalid email/password entry");
  }

  if (!user.isActive) {
    throw new HTTPError(400, "Cannot login with a deleted user");
  }

  const token = jwt.sign({ id: user.id, isAdm: user.isAdm }, SECRET, {
    expiresIn: "72h",
  });

  return token;
};

export default loginService;
