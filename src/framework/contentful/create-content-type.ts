import { runMigration, MigrationFunction } from "contentful-migration";
import { getContentfulContext } from "./environment";

function isNotFoundError(err: any): boolean {
  return err?.name === "NotFound";
}

/**
 * Creates a content type if it does not already exist.
 * Gracefully skips if it exists.
 */
export async function createContentType(
  contentTypeId: string,
  migrationFn: MigrationFunction,
  dryRun: boolean
) {
  console.log(
    `\n---------------------------------------------------------\n\n` +
      `🧱 Create → Content Type: ${contentTypeId}\n`
  );

  const { contentfulEnvironment, contentfulSpace, contentfulClient } =
    await getContentfulContext();

  // ------------------------------------------------------------------
  // 1. CHECK IF CONTENT TYPE EXISTS
  // ------------------------------------------------------------------

  try {
    await contentfulEnvironment.getContentType(contentTypeId);

    console.log(
      `ℹ️  Content type '${contentTypeId}' already exists. Skipping create.\n` +
        `\n---------------------------------------------------------\n`
    );
    return;
  } catch (err: any) {
    if (!isNotFoundError(err)) {
      console.log(
        `    ❌ Failed to check content type: ${err.message}\n` +
          `\n---------------------------------------------------------\n`
      );
      throw err;
    }
    // Not found → continue to create
  }

  // ------------------------------------------------------------------
  // 2. CREATE CONTENT TYPE
  // ------------------------------------------------------------------

  if (dryRun) {
    console.log(
      `    [dry-run] Would create content type '${contentTypeId}'\n` +
        `\n---------------------------------------------------------\n`
    );
    return;
  }

  await runMigration({
    spaceId: contentfulSpace.sys.id,
    environmentId: contentfulEnvironment.sys.id,
    yes: true,
    migrationFunction: migrationFn,
  });

  console.log(
    `\n    🎉 Content type '${contentTypeId}' created successfully.\n` +
      `\n---------------------------------------------------------\n`
  );
}
