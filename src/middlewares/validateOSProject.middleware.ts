import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const validateOSProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { preferredOS } = req.body;

  const validOSOptions = ["Windows", "Linux", "MacOS"];

  if (!validOSOptions.includes(preferredOS)) {
    throw new AppError("Invalid OS option.", 400);
  }

  return next();
};
