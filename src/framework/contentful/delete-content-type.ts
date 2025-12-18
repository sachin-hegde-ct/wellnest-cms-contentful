import { runMigration } from "contentful-migration";
import { getContentfulContext } from "./environment";
import { confirm } from "@inquirer/prompts";

function isNotFoundError(err: any): boolean {
  return err?.name === "NotFound";
}

/**
 * Deletes all entries of a content type and then deletes the schema.
 * Gracefully skips if content type does not exist.
 */
export async function deleteContentType(
  contentTypeId: string,
  dryRun: boolean
) {
  console.log(
    `\n---------------------------------------------------------\n\n` +
      `🗑️  Delete → Content Type: ${contentTypeId}\n`
  );

  const { contentfulSpace, contentfulEnvironment } =
    await getContentfulContext();

  // ------------------------------------------------------------------
  // ✅ 0. CHECK IF CONTENT TYPE EXISTS (CRITICAL FIX)
  // ------------------------------------------------------------------

  try {
    await contentfulEnvironment.getContentType(contentTypeId);
  } catch (err: any) {
    if (isNotFoundError(err)) {
      console.log(
        `\nℹ️  Content type '${contentTypeId}' does not exist. Skipping delete.\n` +
          `\n---------------------------------------------------------\n`
      );
      return;
    }

    console.log(
      `❌ Failed to check content type existence: ${err.message}\n` +
        `\n---------------------------------------------------------\n`
    );
    throw err;
  }

  // ------------------------------------------------------------------
  // 1. FETCH & DELETE ENTRIES
  // ------------------------------------------------------------------

  const entries = await contentfulEnvironment.getEntries({
    content_type: contentTypeId,
    limit: 1000,
  });

  const count = entries.items.length;

  if (count > 0) {
    console.log(`    ⚠️  Found ${count} entr${count === 1 ? "y" : "ies"}.\n`);

    if (!dryRun) {
      const confirmed = await confirm({
        message: `Delete ALL ${count} entries of '${contentTypeId}'?`,
        default: false,
      });

      if (!confirmed) {
        console.log(`    ❌ Entry deletion aborted.\n`);
        return;
      }
    }

    for (const entry of entries.items) {
      const id = entry.sys.id;

      if (dryRun) {
        console.log(`        [dry-run] Would delete entry ${id}`);
        continue;
      }

      try {
        if (entry.isPublished && entry.isPublished()) {
          console.log(`        • Unpublish: ${id}`);
          await entry.unpublish();
        }

        console.log(`        • Delete: ${id}`);
        await entry.delete();
      } catch (err: any) {
        console.log(`        ❌ Failed to delete ${id}: ${err.message}`);
      }
    }

    console.log(`\n    ✅ All entries removed from '${contentTypeId}'\n`);
  }

  // ------------------------------------------------------------------
  // 2. DELETE CONTENT TYPE SCHEMA
  // ------------------------------------------------------------------

  if (dryRun) {
    console.log(
      `    [dry-run] Would delete schema '${contentTypeId}'\n` +
        `\n---------------------------------------------------------\n`
    );
    return;
  }

  const confirmedSchema = await confirm({
    message: `Delete content type schema '${contentTypeId}'?`,
    default: false,
  });

  if (!confirmedSchema) {
    console.log(`    ❌ Schema deletion aborted.\n`);
    return;
  }

  console.log(`    ⏳ Removing schema '${contentTypeId}'…\n`);

  try {
    await runMigration({
      spaceId: contentfulSpace.sys.id,
      environmentId: contentfulEnvironment.sys.id,
      yes: true,
      migrationFunction: (migration) => {
        migration.deleteContentType(contentTypeId);
      },
    });

    console.log(
      `    🎉 Content type '${contentTypeId}' deleted successfully.\n` +
        `\n---------------------------------------------------------\n`
    );
  } catch (err: any) {
    if (isNotFoundError(err)) {
      console.log(
        `\nℹ️  Content type '${contentTypeId}' already deleted.\n` +
          `\n---------------------------------------------------------\n`
      );
      return;
    }

    console.log(
      `    ❌ Failed to delete schema: ${err.message}\n` +
        `\n---------------------------------------------------------\n`
    );
  }
}
