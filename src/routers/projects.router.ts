import { Router } from "express";
import { projectsControllers } from "../controllers";
import {
  validateIdDeveloper,
  validateIdProject,
  validateProjectIdDeveloper,
} from "../middlewares";

const projectsRouter: Router = Router();

projectsRouter.post("", validateProjectIdDeveloper, projectsControllers.create);
projectsRouter.get("/:id", validateIdProject, projectsControllers.retrieve);
projectsRouter.patch(
  "/:id",
  validateIdProject,
  validateProjectIdDeveloper,
  projectsControllers.partialUpdate
);

export default projectsRouter;
