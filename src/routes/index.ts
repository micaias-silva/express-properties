import { Application } from "express";
import categoriesRoutes from "./categories";
import propertiesRoutes from "./properties";
import schedulesRoutes from "./schedules";
import sessionsRoutes from "./sessions";
import usersRoutes from "./users";

const routes = (app: Application) => {
  app.use(usersRoutes);
  app.use(sessionsRoutes);
  app.use(categoriesRoutes);
  app.use(propertiesRoutes);
  app.use(schedulesRoutes);
};

export default routes;
