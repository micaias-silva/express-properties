import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { IUserLogin } from "../../interfaces/users";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";

const loginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(Users);

  const SECRET = process.env.SECRET_KEY as string;
  const user = await userRepository.findOne({ where: { email: email } });

  if (!user) {
    throw new Error("Invalid email/password entry");
  }

  const passwordMatch = compareSync(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid email/password entry");
  }

  const token = jwt.sign({ id: user.id, isAdm: user.isAdm }, SECRET, {
    expiresIn: "72h",
  });

  return token;
};

export default loginService;
