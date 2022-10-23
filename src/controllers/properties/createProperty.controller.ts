import { Request, Response } from "express";
import createPropertyService from "../../services/properties/createProperty.service";

const createPropertyController = async (req: Request, res: Response) => {
  const { value, address, categoryId, size } = req.body;
  const newProperty = await createPropertyService({
    value,
    address,
    categoryId,
    size,
  });

  return res.status(201).json(newProperty);
};

export default createPropertyController;
