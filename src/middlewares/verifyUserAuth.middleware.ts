import { NextFunction, Request, Response } from "express";
import HTTPError from "../errors/HTTPError";
import verifyToken from "../tools/verifyToken";
import verifyAdminTokenMiddleware from "./verifyAdminToken.middleware";

const verifyUserAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const actingUser = verifyToken(authorization);
  if (actingUser.id === id) {
    next();
  }
  if (!actingUser.isAdm && actingUser.id !== id) {
    throw new HTTPError(401, "Unauthorized");
  } else {
    verifyAdminTokenMiddleware(req, res, next);
  }
};

export default verifyUserAuthMiddleware;
