import { runMigration, MigrationFunction } from "contentful-migration";
import { getContentfulContext } from "./environment";
import { contentTypeExists } from "./content-type-check";

/**
 * Creates a content type if it does not already exist.
 * Gracefully skips if it exists.
 */
export async function createContentType(
  contentTypeId: string,
  migrationFn: MigrationFunction
) {
  console.log("\n" + "-".repeat(60) + "\n");
  console.log(`\n🧱 Create → Content Type: ${contentTypeId}\n`);

  const { contentfulEnvironment, contentfulSpace } =
    await getContentfulContext();

  // ------------------------------------------------------------------
  // 1. CHECK IF CONTENT TYPE EXISTS
  // ------------------------------------------------------------------

  const exists = await contentTypeExists(contentTypeId);
  
  if (exists) {
    console.log(
      `ℹ️  Content type '${contentTypeId}' already exists. Skipping create.\n`
    );
    console.log("\n" + "-".repeat(60) + "\n");
    return;
  }

  // ------------------------------------------------------------------
  // 2. CREATE CONTENT TYPE
  // ------------------------------------------------------------------

  await runMigration({
    spaceId: contentfulSpace.sys.id,
    environmentId: contentfulEnvironment.sys.id,
    yes: true,
    migrationFunction: migrationFn,
  });

  console.log(`\n🎉 Content type '${contentTypeId}' created successfully.\n`);
  console.log("\n" + "-".repeat(60) + "\n");
}
