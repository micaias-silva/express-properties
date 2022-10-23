import { Router } from "express";
import createPropertyController from "../../controllers/properties/createProperty.controller";
import listPropertiesController from "../../controllers/properties/listProperties.controller";
import verifyAdminTokenMiddleware from "../../middlewares/verifyAdminToken.middleware";

const propertiesRoutes = Router();

propertiesRoutes.get("/properties", listPropertiesController);
propertiesRoutes.post(
  "/properties",
  verifyAdminTokenMiddleware,
  createPropertyController
);

export default propertiesRoutes;
