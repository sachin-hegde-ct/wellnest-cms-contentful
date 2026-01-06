import { runMigration } from "contentful-migration";
import { getContentfulContext } from "./environment";
import { confirm } from "@inquirer/prompts";
import { isNotFoundError } from "../helpers/error";
import { contentTypeExists } from "./content-type-check";
import { getEntries } from "./get-entries";
import { unPublishEntry } from "./unpublish-entry";

/**
 * Deletes all entries of a content type and then deletes the schema.
 * Gracefully skips if content type does not exist.
 */
export async function deleteContentType(contentTypeId: string) {
  console.log("\n" + "-".repeat(60) + "\n");
  console.log(`\n🗑️  Delete → Content Type: ${contentTypeId}\n`);

  const { contentfulSpace, contentfulEnvironment } =
    await getContentfulContext();

  // ------------------------------------------------------------------
  // ✅ 0. CHECK IF CONTENT TYPE EXISTS
  // ------------------------------------------------------------------
  const exists = await contentTypeExists(contentTypeId);

  if (!exists) {
    console.log(
      `\nℹ️  Content type '${contentTypeId}' does not exist. Skipping delete.\n`
    );
    console.log("\n" + "-".repeat(60) + "\n");
    return;
  }

  // ------------------------------------------------------------------
  // 1. FETCH & DELETE ENTRIES
  // ------------------------------------------------------------------

  const entries = await getEntries({ content_type: contentTypeId });

  const count = entries.items.length;

  if (count > 0) {
    console.log(`    ⚠️  Found ${count} entr${count === 1 ? "y" : "ies"}.\n`);

    const confirmed = await confirm({
      message: `Delete ALL ${count} entries of '${contentTypeId}'?`,
      default: false,
    });

    if (!confirmed) {
      console.log(`    ❌ Entry deletion aborted.\n`);
      return;
    }

    for (const entry of entries.items) {
      const id = entry.sys.id;

      try {
        await unPublishEntry(entry);

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
      `    🎉 Content type '${contentTypeId}' deleted successfully.\n`
    );
    console.log("\n" + "-".repeat(60) + "\n");
  } catch (err: any) {
    if (isNotFoundError(err)) {
      console.log(`\nℹ️  Content type '${contentTypeId}' already deleted.\n`);
      console.log("\n" + "-".repeat(60) + "\n");
      return;
    }

    console.log(`    ❌ Failed to delete schema: ${err.message}\n`);
    console.log("\n" + "-".repeat(60) + "\n");
  }
}
