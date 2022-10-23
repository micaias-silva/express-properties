import { Request, Response } from "express";
import createScheduleService from "../../services/schedules/createSchedule.service";
import verifyToken from "../../tools/verifyToken";

const createScheduleController = async (req: Request, res: Response) => {
  const { date, hour, propertyId } = req.body;
  const { authorization } = req.headers;
  const user = verifyToken(authorization);
  const schedule = await createScheduleService({
    date,
    hour,
    propertyId,
    userId: user.id,
  });
  return res.status(201).json({
    schedule,
    message: `Scheduled to ${schedule.date} ${schedule.hour}`,
  });
};

export default createScheduleController;
