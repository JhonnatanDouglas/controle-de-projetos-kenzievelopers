import { NextFunction, Request, Response } from "express";
import { DeveloperResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

export const validateProjectIdDeveloper = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { developerId } = req.body;
  if (!developerId) return next();

  const queryResult: DeveloperResult = await client.query(
    `SELECT * FROM "developers" WHERE "id" = $1;`,
    [developerId]
  );

  if (!queryResult.rowCount) {
    throw new AppError("Developer not found.", 404);
  }

  return next();
};
