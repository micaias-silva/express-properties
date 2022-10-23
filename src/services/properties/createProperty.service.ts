import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Categories } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";
import HTTPError from "../../errors/HTTPError";
import { IPropertyRequest } from "../../interfaces/properties";

const createPropertyService = async ({
  value,
  address,
  categoryId,
  size,
}: IPropertyRequest) => {
  const categoryRepo = AppDataSource.getRepository(Categories);
  const propertyRepo = AppDataSource.getRepository(Properties);
  const addressRepo = AppDataSource.getRepository(Addresses);

  if (address.zipCode.length > 8 || address.state.length > 2) {
    throw new HTTPError(
      400,
      "ZipCode/State length properties can't be ZipCode > 8 or State > 2"
    );
  }

  if (!address.number) {
    address.number = "SN";
  }

  const addressAlreadyExists = await addressRepo.findOne({
    where: {
      ...address,
    },
  });

  const category = await categoryRepo.findOne({
    where: { id: categoryId },
  });

  if (!category) {
    throw new HTTPError(404, "Category does not exists");
  }

  if (addressAlreadyExists) {
    throw new HTTPError(400, "Property already exists");
  }

  const newAddress = addressRepo.create({ ...address });
  await addressRepo.save(newAddress);
  const newProperty = propertyRepo.create({
    address: newAddress,
    size,
    value,
    category,
  });

  await propertyRepo.save(newProperty);

  return newProperty;
};

export default createPropertyService;
