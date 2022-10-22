import { Request, Response } from "express";
import HTTPError from "../../errors/HTTPError";
import patchUserService from "../../services/users/patchUser.service";

const patchUserController = async (req: Request, res: Response) => {
  const data = req.body;
  if (
    data.isActive !== undefined ||
    data.id !== undefined ||
    data.isAdm !== undefined
  ) {
    throw new HTTPError(401, "Can't accept a property");
  }
  const { id } = req.params;
  await patchUserService(id, data);

  return res.status(200).end();
};

export default patchUserController;
