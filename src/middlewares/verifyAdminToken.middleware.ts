import { NextFunction, Request, Response } from "express";
import verifyToken from "../tools/verifyToken";

const verifyAdminTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    const user: any = verifyToken(authorization);
    if (user.isAdm) {
      next();
    } else {
      throw { code: 403, message: "Unauthorized" };
    }
  } catch (err: any) {
    if (err instanceof Error) {
      return res.status(403).json({ message: err.message });
    }
    return res.status(err.code).json({ message: err.message });
  }
};

export default verifyAdminTokenMiddleware;
