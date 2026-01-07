import { getContentfulContext } from "./environment";
import { getEntries } from "./get-entries";
import { unPublishEntry } from "./unpublish-entry";

/**
 * Purges ALL entries of a given content type.
 * Safe for large datasets and dry-run.
 */
export async function purgeEntriesByContentType(
  contentType: string,
  dryRun: boolean,
) {
  const { contentfulEnvironment } = await getContentfulContext();

  const limit = 1000;

  // -------------------------------------------------------
  // 1️⃣ Get TOTAL count
  // -------------------------------------------------------

  const meta = await getEntries({ content_type: contentType, limit: 0 });

  const total = meta.total;

  if (total === 0) {
    console.log(`   ℹ️  No entries found to purge.\n`);
    return;
  }

  // -------------------------------------------------------
  // 2️⃣ COLLECT ENTRY IDS (snapshot)
  // -------------------------------------------------------

  const entryIds: string[] = [];
  let skip = 0;

  while (entryIds.length < total) {
    const { items } = await getEntries({
      content_type: contentType,
      limit,
      skip,
    });

    if (!items.length) break;

    for (const entry of items) {
      entryIds.push(entry.sys.id);
    }

    skip += items.length;
  }

  // -------------------------------------------------------
  // 3️⃣ PURGE SNAPSHOT
  // -------------------------------------------------------

  let processed = 0;

  for (const entryId of entryIds) {
    processed++;

    console.log(`   [${processed}/${total}] 🧹 Processing entry: ${entryId}`);

    if (dryRun) {
      console.log(
        `        [dry-run] Would unpublish (if needed) and delete ${entryId}\n`,
      );
      continue;
    }

    try {
      const entry = await contentfulEnvironment.getEntry(entryId);

      await unPublishEntry(entry);

      await entry.delete();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.log(`      ❌ Failed to delete ${entryId}: ${errorMessage}`);
    }
  }

  // -------------------------------------------------------
  // 4️⃣ SUMMARY
  // -------------------------------------------------------

  if (dryRun) {
    console.log(
      `\n🧪 Dry run completed. ${processed} entr${
        processed === 1 ? "y" : "ies"
      } would have been purged.\n`,
    );
  } else {
    console.log(
      `\n✅ Purge completed. Deleted ${processed} entr${
        processed === 1 ? "y" : "ies"
      }.\n`,
    );
  }
}
