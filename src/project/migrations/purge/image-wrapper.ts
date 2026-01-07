import { Migration } from "../../../framework/types/migration";
import { contentTypeExists } from "../../../framework/contentful/content-type-check";
import { deleteAssetById } from "../../../framework/contentful/delete-asset";
import { confirm } from "@inquirer/prompts";
import { CONTENT_TYPES } from "../../config/content-types";
import { getEntries } from "../../../framework/contentful/get-entries";
import { unPublishEntry } from "../../../framework/contentful/unpublish-entry";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const PAGE_SIZE = 1000;

const purgeImageWrappers: Migration = {
  id: "purge-entry-image-wrappers",
  kind: "purge",
  target: CONTENT_TYPES.IMAGE_WRAPPER,

  async run({ dryRun }) {
    console.log("\n" + "-".repeat(60) + "\n");
    console.log(`\n🔥 PURGE → Image Wrappers and Assets\n`);

    const exists = await contentTypeExists(CONTENT_TYPES.IMAGE_WRAPPER);

    if (!exists) {
      console.log(
        `   ℹ️  Content type '${CONTENT_TYPES.IMAGE_WRAPPER}' does not exist.\n`,
      );
      return;
    }

    if (!dryRun) {
      const confirmed = await confirm({
        message:
          "This will PERMANENTLY delete ALL Image Wrappers and their Assets. Continue?",
        default: false,
      });

      if (!confirmed) {
        console.log(`   ❌ Purge aborted.\n`);
        return;
      }
    }

    // ------------------------------------------------------
    // Fetch total count once (for progress display)
    // ------------------------------------------------------
    const meta = await getEntries({
      content_type: CONTENT_TYPES.IMAGE_WRAPPER,
      limit: 0,
    });

    const total = meta.total;
    let processed = 0;

    const assetIds = new Set<string>();
    let skip = 0;

    // ------------------------------------------------------
    // Delete ImageWrappers (paginated)
    // ------------------------------------------------------
    while (true) {
      const { items } = await getEntries({
        content_type: CONTENT_TYPES.IMAGE_WRAPPER,
        limit: PAGE_SIZE,
        skip,
      });

      if (!items.length) break;

      for (const entry of items) {
        processed++;

        const assetId = entry.fields?.media?.["en-US"]?.sys?.id;
        if (assetId) assetIds.add(assetId);

        console.log(
          `   🧹 [${processed}/${total}] Deleting ImageWrapper: ${entry.sys.id}`,
        );

        if (dryRun) {
          console.log(
            `      [dry-run] Would delete ImageWrapper ${entry.sys.id}`,
          );
          continue;
        }

        await unPublishEntry(entry);

        await entry.delete();
      }

      skip += items.length;
    }

    console.log(
      `\n   🧾 Collected ${assetIds.size} assets from ${processed} image wrappers.\n`,
    );

    // ------------------------------------------------------
    // Delete Assets
    // ------------------------------------------------------
    let assetIndex = 0;
    const assetTotal = assetIds.size;

    for (const assetId of Array.from(assetIds)) {
      assetIndex++;

      console.log(
        `   🖼️  [${assetIndex}/${assetTotal}] Deleting asset: ${assetId}`,
      );

      if (dryRun) {
        console.log(`      [dry-run] Would delete asset ${assetId}`);
        continue;
      }

      await deleteAssetById(assetId);
    }

    console.log(
      dryRun ? "" : `\n🔥 All Image Wrappers and assets purged successfully.\n`,
    );
    console.log("\n" + "-".repeat(60) + "\n");
  },
};

export default purgeImageWrappers;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(purgeImageWrappers);
