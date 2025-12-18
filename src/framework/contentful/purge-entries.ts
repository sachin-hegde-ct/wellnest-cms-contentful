import { getContentfulContext } from "./environment";

/**
 * Reusable purge helper.
 * Deletes ALL entries of a given content type.
 */
export async function purgeEntriesByContentType(
  contentType: string,
  dryRun: boolean
) {
  const { contentfulEnvironment } = await getContentfulContext();

  let skip = 0;
  const limit = 1000;

  while (true) {
    const { items } = await contentfulEnvironment.getEntries({
      content_type: contentType,
      limit,
      skip,
    });

    if (!items.length) break;

    for (const [index, entry] of items.entries()) {
      console.log(
        `  [${skip + index + 1} / ${items.length}] 🧹 ${entry.sys.id}`
      );

      if (dryRun) {
        console.log(`      [dry-run] Would delete entry ${entry.sys.id}\n`);
        continue;
      }

      if (entry.isPublished && entry.isPublished()) {
        await entry.unpublish();
      }

      await entry.delete();
    }

    skip += items.length;
  }
}
