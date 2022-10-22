import { Request, Response } from "express";
import createUserService from "../../services/users/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, isAdm } = req.body;
    const user = await createUserService({ name, email, password, isAdm });
    res.status(201).json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    }
  }
};

export default createUserController;
