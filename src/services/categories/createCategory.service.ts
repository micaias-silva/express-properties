import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import HTTPError from "../../errors/HTTPError";
import { ICategoryRequest } from "../../interfaces/categories";

const createCategoryService = async ({name}: ICategoryRequest) => {
  const categoryRepo = AppDataSource.getRepository(Categories);
  const categoryAlreadyExists = await categoryRepo.findOne({ where: { name } });
  if (categoryAlreadyExists) {
    throw new HTTPError(400, "Category name already exists");
  }
  const newCategory = categoryRepo.create({ name: name });

  await categoryRepo.save(newCategory);

  return newCategory;
};

export default createCategoryService;
