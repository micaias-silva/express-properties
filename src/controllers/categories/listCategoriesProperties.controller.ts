import { Request, Response } from "express";
import listCategoriesPropertiesService from "../../services/categories/listCategoriesProperties.service";

const listCategoriesPropertiesController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const properties = await listCategoriesPropertiesService(id);
  return res.status(200).json(properties);
};

export default listCategoriesPropertiesController;
