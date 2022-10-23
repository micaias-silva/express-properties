import { Timestamp } from "typeorm";
import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { Schedules } from "../../entities/schedules.entity";
import { Users } from "../../entities/users.entity";
import HTTPError from "../../errors/HTTPError";
import { IScheduleRequest } from "../../interfaces/schedules";

const createScheduleService = async ({
  userId,
  propertyId,
  date,
  hour,
}: IScheduleRequest) => {
  const scheduleRepo = AppDataSource.getRepository(Schedules);
  const propertyRepo = AppDataSource.getRepository(Properties);
  const userRepo = AppDataSource.getRepository(Users);

  const validProperty = await propertyRepo.findOne({
    where: { id: propertyId },
  });

  if (!validProperty) {
    throw new HTTPError(404, "Property not found");
  }

  const validUser = await userRepo.findOne({ where: { id: userId } });

  if (!validUser) {
    throw new HTTPError(404, "User not found");
  }

  const time = new Date(`${date} ${hour}`);

  const validTime = Date.parse(time.toString());
  if (!validTime) {
    throw new HTTPError(400, "Invalid Date");
  }

  const timeDate = time.toLocaleDateString();
  const timeHour = time.toLocaleTimeString();

  if (time.getHours() < 8 || time.getHours() >= 18) {
    throw new HTTPError(
      400,
      "Unable to schedule before or after 8:00 AM to 6:00 PM"
    );
  }

  switch (time.toDateString().slice(0, 3)) {
    case "Sun":
      throw new HTTPError(400, "Unable to schedule property visit at Sunday");

    case "Sat":
      throw new HTTPError(400, "Unable to schedule property visit at Saturday");

    default:
      break;
  }

  const scheduleAlreadyExists = await scheduleRepo.findOne({
    where: { date: timeDate, hour: timeHour },
  });

  if (scheduleAlreadyExists) {
    throw new HTTPError(400, "Schedule already exists");
  }

  const schedule = scheduleRepo.create({
    date: timeDate,
    hour: timeHour,
    property: validProperty,
    user: validUser,
  });

  await scheduleRepo.save(schedule);

  return schedule;
};

export default createScheduleService;
