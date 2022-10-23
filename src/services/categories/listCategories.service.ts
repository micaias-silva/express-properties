import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";

const listCategoriesService = async () => {
  const categoryRepo = AppDataSource.getRepository(Categories);
  const categories = await categoryRepo.find();
  return categories;
};

export default listCategoriesService;
