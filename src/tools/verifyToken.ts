import { verify } from "jsonwebtoken";
import "dotenv/config";
import HTTPError from "../errors/HTTPError";

const verifyToken = (token: string | undefined): any => {
  if (!token) {
    throw new HTTPError(401, "Missing authorization token");
  }

  token = token.split(" ")[1];
  const SECRET = process.env.SECRET_KEY as string;
  return verify(token, SECRET, (err: any, decoded: any) => {
    if (err instanceof Error) {
      throw new HTTPError(401, "Invalid token");
    }
    return decoded;
  });
};

export default verifyToken;
