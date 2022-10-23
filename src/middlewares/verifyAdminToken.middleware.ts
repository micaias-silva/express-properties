import { NextFunction, Request, Response } from "express";
import HTTPError from "../errors/HTTPError";
import verifyToken from "../tools/verifyToken";

const verifyAdminTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  const user: any = verifyToken(authorization);
  if (user.isAdm) {
    next();
  } else {
    throw new HTTPError(403, "Unauthorized");
  }
};

export default verifyAdminTokenMiddleware;
