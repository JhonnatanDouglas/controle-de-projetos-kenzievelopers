import { Router } from "express";
import { developerControllers } from "../controllers";
import { uniqueEmailDeveloper, validateIdDeveloper } from "../middlewares";

const developerRouter: Router = Router();

developerRouter.post("", uniqueEmailDeveloper, developerControllers.create);
developerRouter.get("/:id", validateIdDeveloper, developerControllers.retrieve);
developerRouter.patch(
  "/:id",
  validateIdDeveloper,
  uniqueEmailDeveloper,
  developerControllers.partialUpdate
);
developerRouter.delete(
  "/:id",
  validateIdDeveloper,
  developerControllers.destroy
);

export default developerRouter;
