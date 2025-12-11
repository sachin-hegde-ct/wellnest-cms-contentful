import { runMigration, type MigrationFunction } from "contentful-migration";
import {
  CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_MANAGEMENT_TOKEN,
  CONTENTFUL_SPACE_ID,
} from "./env";

export const createContentType = async (
  label: string,
  migrationFn: MigrationFunction
): Promise<void> => {
  console.log(
    `\n---------------------------------------------------------\n\n` +
      `📦 Operation: Create, Content Type: ${label}\n`
  );

  try {
    await runMigration({
      spaceId: CONTENTFUL_SPACE_ID,
      environmentId: CONTENTFUL_ENVIRONMENT,
      accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
      yes: true,
      migrationFunction: migrationFn,
    });

    console.log(
      `    🎉 Content type '${label}' created successfully.\n` +
        `\n---------------------------------------------------------\n`
    );
  } catch (err: any) {
    console.log(
      `    ❌ Failed to create '${label}'\n` +
        `    Reason: ${err.message || err}\n` +
        `\n---------------------------------------------------------\n`
    );
  }
};
