import { NextFunction, Request, Response } from "express"; 
import verifyToken from "../tools/verifyToken";
import verifyAdminTokenMiddleware from "./verifyAdminToken.middleware";

const verifyUserAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    const actingUser = verifyToken(authorization);
    if (actingUser.id === id) {
      next();
    }
    if (!actingUser.isAdm && actingUser.id !== id) {
      throw new Error("Unauthorized");
    } else {
      verifyAdminTokenMiddleware(req, res, next);
    }
  } catch (err: any) {
    if (err instanceof Error) {
      return res.status(401).json({ message: err.message });
    }
    return res.status(err.code).json({ message: err.message });
  }
};

export default verifyUserAuthMiddleware;
