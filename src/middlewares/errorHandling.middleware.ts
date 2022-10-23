import { NextFunction, Request, Response } from "express";
import HTTPError from "../errors/HTTPError";

const errorHandlingMiddleware = (
  err: any,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (err instanceof HTTPError) {
    const { statusCode, message } = err;
    return res.status(statusCode).json({ message: message });
  }

  return res.status(500).json({ message: err.message });
};

export default errorHandlingMiddleware;
