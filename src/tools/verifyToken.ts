import { verify } from "jsonwebtoken";
import "dotenv/config";

const verifyToken = (token: string | undefined): any => {
  if (!token) {
    throw { code: 401, message: "Missing authorization token" };
  }

  token = token.split(" ")[1];
  const SECRET = process.env.SECRET_KEY as string;
  return verify(token, SECRET, (err: any, decoded: any) => {
    if (err instanceof Error) {
      throw { code: 401, message: "Invalid Token" };
    }
    return decoded;
  });
};

export default verifyToken;
