import { Router } from "express";
import createScheduleController from "../../controllers/schedules/createSchedule.controller";
import listPropertySchedulesController from "../../controllers/schedules/listPropertySchedules";
import verifyAdminTokenMiddleware from "../../middlewares/verifyAdminToken.middleware";
import verifyUserAuthMiddleware from "../../middlewares/verifyUserAuth.middleware";

const schedulesRoutes = Router();

schedulesRoutes.get(
  "/schedules/properties/:id",
  verifyAdminTokenMiddleware,
  listPropertySchedulesController
);
schedulesRoutes.post("/schedules", createScheduleController);

export default schedulesRoutes;
