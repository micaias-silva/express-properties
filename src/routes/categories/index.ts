import { Router } from "express";
import createCategoryController from "../../controllers/categories/createCategory.controller";
import listCategoriesController from "../../controllers/categories/listCategories.controller";
import listCategoriesPropertiesController from "../../controllers/categories/listCategoriesProperties.controller";
import verifyAdminTokenMiddleware from "../../middlewares/verifyAdminToken.middleware";

const categoriesRoutes = Router();

categoriesRoutes.get("/categories", listCategoriesController);
categoriesRoutes.get(
  "/categories/:id/properties",
  listCategoriesPropertiesController
);
categoriesRoutes.post(
  "/categories",
  verifyAdminTokenMiddleware,
  createCategoryController
);

export default categoriesRoutes;
