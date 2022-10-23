import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";
import HTTPError from "../../errors/HTTPError";

const listCategoriesPropertiesService = async (id: string) => {
  const categoryRepo = AppDataSource.getRepository(Categories);
  const propertyRepo = AppDataSource.getRepository(Properties);
  const category = await categoryRepo.findOne({ where: { id } });

  if (!category) {
    throw new HTTPError(404, "Category not found");
  }

  const properties = await propertyRepo.find({ where: { category: { id } } });
  return {id, name: category.name, properties};
};

export default listCategoriesPropertiesService;
