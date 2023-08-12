import format from "pg-format";
import {
  DeveloperInfos,
  DeveloperInfosCreate,
  DeveloperInfosResult,
} from "../interfaces";
import { client } from "../database";

const create = async (
  payload: DeveloperInfosCreate
): Promise<DeveloperInfos> => {
  const queryString: string = format(
    `INSERT INTO "developerInfos" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: DeveloperInfosResult = await client.query(queryString);
  return queryResult.rows[0];
};

export default { create };
