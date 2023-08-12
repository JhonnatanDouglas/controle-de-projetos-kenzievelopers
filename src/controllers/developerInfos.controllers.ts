import { Request, Response } from "express";
import { developerInfosServices } from "../services";
import { DeveloperInfos, DeveloperInfosCreate } from "../interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload: DeveloperInfosCreate = {
    ...req.body,
    developerId: req.params.id,
  };

  const developer: DeveloperInfos = await developerInfosServices.create(
    payload
  );
  return res.status(201).json(developer);
};

export default { create };
