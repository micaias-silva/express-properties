import loginService from "../../services/sessions/login.service";
import { Request, Response } from "express";

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginService({ email, password });
    return res.status(200).json({ token: token });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(403).json({ message: err.message });
    }
  }
};

export default loginController;
