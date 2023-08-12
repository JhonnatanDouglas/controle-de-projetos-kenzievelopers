import { NextFunction, Request, Response } from "express";
import { DeveloperInfosResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

export const validateIdDeveloperInfos = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const queryResult: DeveloperInfosResult = await client.query(
    `SELECT * FROM "developerInfos" WHERE "id" = $1;`,
    [id]
  );

  if (queryResult.rowCount) {
    throw new AppError("Developer infos already exists.", 409);
  }

  return next();
};
