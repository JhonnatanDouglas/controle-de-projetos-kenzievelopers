import { NextFunction, Request, Response } from "express";
import { DeveloperResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

export const validateIdDeveloper = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const queryResult: DeveloperResult = await client.query(
    `SELECT * FROM "developers" WHERE "id" = $1;`,
    [id]
  );

  if (!queryResult.rowCount) {
    throw new AppError("Developer not found.", 404);
  }

  return next();
};
