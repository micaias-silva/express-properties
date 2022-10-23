import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/schedules.entity";
import HTTPError from "../../errors/HTTPError";

const listProperysSchedulesService = async (id: string) => {
  const scheduleRepo = AppDataSource.getRepository(Schedules);
  const schedules = await scheduleRepo.find({
    where: { property: { id: id } },
  });

  if (schedules.length === 0) {
    throw new HTTPError(404, "No schedules to this property");
  }
  return schedules;
};
export default listProperysSchedulesService;
