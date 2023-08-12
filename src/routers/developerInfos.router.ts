import { Router } from "express";
import { developerInfosControllers } from "../controllers";
import {
  validateIdDeveloper,
  validateIdDeveloperInfos,
  validateOSProject,
} from "../middlewares";

const developerInfosRouter: Router = Router();

developerInfosRouter.post(
  "/:id/infos",
  validateIdDeveloperInfos,
  validateIdDeveloper,
  validateOSProject,
  developerInfosControllers.create
);

export default developerInfosRouter;
