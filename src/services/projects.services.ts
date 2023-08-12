import format from "pg-format";
import {
  Project,
  ProjectCreate,
  ProjectResult,
  ProjectUpdate,
} from "../interfaces";
import { client } from "../database";

const create = async (payload: ProjectCreate): Promise<Project> => {
  const queryString: string = format(
    `INSERT INTO "projects" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: ProjectResult = await client.query(queryString);
  return queryResult.rows[0];
};

const retrieve = async (id: string): Promise<Project> => {
  const query: string = `
        SELECT 
            "proj"."id" AS "projectId",
            "proj"."name" AS "projectName",
            "proj"."description" AS "projectDescription",
            "proj"."repository" AS "projectRepository",
            "proj"."startDate" AS "projectStartDate",
            "proj"."endDate" AS "projectEndDate",
            "dev"."name" AS "projectDeveloperName"
        FROM "projects" AS "proj"  
        LEFT JOIN "developers" AS "dev" 
            ON "proj"."developerId" = "dev"."id"
        WHERE "proj"."id" = $1;
     `;

  const queryResult: ProjectResult = await client.query(query, [id]);
  return queryResult.rows[0];
};

const partialUpdate = async (
  id: string,
  payload: ProjectUpdate
): Promise<Project> => {
  const queryFormat: string = format(
    `UPDATE "projects" SET (%I) = ROW(%L) WHERE "id" = $1 RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: ProjectResult = await client.query(queryFormat, [id]);
  return queryResult.rows[0];
};

export default { create, retrieve, partialUpdate };
