import { Request, Response } from "express";
import listProperysSchedulesService from "../../services/schedules/listPropertySchedules.service";

const listPropertySchedulesController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const schedules = await listProperysSchedulesService(id);
  return res.status(200).json({ schedules });
};

export default listPropertySchedulesController;
