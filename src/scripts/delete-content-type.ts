import { runMigration } from "contentful-migration";
import {
  CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_MANAGEMENT_TOKEN,
  CONTENTFUL_SPACE_ID,
} from "./env.js";
import { prettyError } from "./formatter.js";
import { getContentful } from "./contentful.js";

/**
 * Deletes all entries of a content type, then deletes the content type schema.
 */
export const deleteContentType = async (
  contentTypeId: string
): Promise<void> => {
  console.log(
    `\n---------------------------------------------------------\n\n` +
      `🗑️  Operation: Delete, Content Type: ${contentTypeId}\n`
  );

  try {
    const { contentfulEnvironment } = await getContentful();

    //
    // 1. FETCH ENTRIES
    //
    let entries;
    try {
      entries = await contentfulEnvironment.getEntries({
        content_type: contentTypeId,
        limit: 1000,
      });
    } catch (err) {
      console.log(
        `    ❌ Error fetching entries: ${prettyError(err, contentTypeId)}\n` +
          `\n---------------------------------------------------------\n`
      );
      return;
    }

    const count = entries.items.length;

    if (count === 0) {
      console.log(`    ✅ No entries found.\n`);
    } else {
      console.log(`    ⚠️  Found ${count} entr${count === 1 ? "y" : "ies"}.\n`);
      console.log(`        ⏳ Preparing to remove entries…`);

      for (const entry of entries.items) {
        const id = entry.sys.id;

        try {
          if (entry.isPublished && entry.isPublished()) {
            console.log(`            • Unpublish: ${id}`);
            await entry.unpublish();
          }

          console.log(`            • Delete: ${id}`);
          await entry.delete();
        } catch (err) {
          console.log(
            `            ❌ Failed to delete ${id}: ${prettyError(
              err,
              contentTypeId
            )}`
          );
        }
      }

      console.log(`\n        ✅ All entries removed from '${contentTypeId}'\n`);
    }

    //
    // 2. DELETE CONTENT TYPE SCHEMA
    //
    console.log(`    ⏳ Removing '${contentTypeId}' schema…\n`);

    try {
      await runMigration({
        spaceId: CONTENTFUL_SPACE_ID,
        environmentId: CONTENTFUL_ENVIRONMENT,
        accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
        yes: true,
        migrationFunction: (migration) => {
          migration.deleteContentType(contentTypeId);
        },
      });

      console.log(
        `    🎉 Content type '${contentTypeId}' deleted successfully.\n` +
          `\n---------------------------------------------------------\n`
      );
    } catch (err) {
      console.log(
        `    ❌ Failed to delete schema: ${prettyError(err, contentTypeId)}\n` +
          `\n---------------------------------------------------------\n`
      );
    }
  } catch (outerErr) {
    console.log(
      `    ❌ Unexpected error: ${prettyError(outerErr, contentTypeId)}\n` +
        `\n---------------------------------------------------------\n`
    );
  }
};
