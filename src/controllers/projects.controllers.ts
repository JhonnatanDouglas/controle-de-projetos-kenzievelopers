import { Request, Response } from "express";
import { Project } from "../interfaces";
import { projectServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const project: Project = await projectServices.create(req.body);
  return res.status(201).json(project);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const developer: Project = await projectServices.retrieve(req.params.id);
  return res.status(200).json(developer);
};

const partialUpdate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { body } = req;
  const { id } = req.params;

  const developer: Project = await projectServices.partialUpdate(id, body);
  return res.status(200).json(developer);
};

export default { create, retrieve, partialUpdate };
