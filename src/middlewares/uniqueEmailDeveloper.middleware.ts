import { NextFunction, Request, Response } from "express";
import { DeveloperResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

export const uniqueEmailDeveloper = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;
  if (!email) return next();

  const queryResult: DeveloperResult = await client.query(
    `SELECT * FROM "developers" WHERE "email" = $1;`,
    [email]
  );

  if (queryResult.rowCount) {
    throw new AppError("Email already exists.", 409);
  }

  return next();
};
