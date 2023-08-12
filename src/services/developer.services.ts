import format from "pg-format";
import { client } from "../database";
import {
  DeveloperCreate,
  Developer,
  DeveloperResult,
  DeveloperUpdate,
} from "../interfaces";

const create = async (payload: DeveloperCreate): Promise<Developer> => {
  const queryString: string = format(
    `INSERT INTO "developers" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: DeveloperResult = await client.query(queryString);
  return queryResult.rows[0];
};

const retrieve = async (id: string): Promise<Developer> => {
  const query: string = `
      SELECT 
          "dev"."id" AS "developerId",
          "dev"."name" AS "developerName",
          "dev"."email" AS "developerEmail",
          "devInfo"."developerSince" AS "developerInfoDeveloperSince",
          "devInfo"."preferredOS" AS "developerInfoPreferredOS"
      FROM "developers" AS "dev" 
      LEFT JOIN "developerInfos" AS "devInfo" 
          ON "devInfo"."id" = "dev"."id"
      WHERE "dev"."id" = $1;
   `;

  const queryResult: DeveloperResult = await client.query(query, [id]);
  return queryResult.rows[0];
};

const partialUpdate = async (
  id: string,
  payload: DeveloperUpdate
): Promise<Developer> => {
  const queryFormat: string = format(
    `UPDATE "developers" SET (%I) = ROW(%L) WHERE "id" = $1 RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: DeveloperResult = await client.query(queryFormat, [id]);
  return queryResult.rows[0];
};

const destroy = async (id: string): Promise<void> => {
  await client.query(`DELETE FROM "developers" WHERE "id" = $1;`, [id]);
};

export default { create, retrieve, partialUpdate, destroy };
