import { getContentfulContext } from "./environment";

/**
 * Purges ALL assets in the environment.
 * Safe for large datasets and dry-run.
 */
export async function purgeAllAssets(dryRun: boolean) {
  const { contentfulEnvironment } = await getContentfulContext();

  const limit = 1000;

  // -------------------------------------------------------
  // 1️⃣ Get TOTAL asset count
  // -------------------------------------------------------

  const meta = await contentfulEnvironment.getAssets({
    limit: 0,
  });

  const total = meta.total;

  if (total === 0) {
    console.log(`   ℹ️  No assets found to purge.\n`);
    return;
  }

  // -------------------------------------------------------
  // 2️⃣ COLLECT ASSET IDS (snapshot)
  // -------------------------------------------------------

  const assetIds: string[] = [];
  let skip = 0;

  while (assetIds.length < total) {
    const { items } = await contentfulEnvironment.getAssets({
      limit,
      skip,
    });

    if (!items.length) break;

    for (const asset of items) {
      assetIds.push(asset.sys.id);
    }

    skip += items.length;
  }

  // -------------------------------------------------------
  // 3️⃣ PURGE ASSETS
  // -------------------------------------------------------

  let deleted = 0;

  for (const assetId of assetIds) {
    deleted++;

    console.log(`   [${deleted}/${total}] 🧹 Purging asset: ${assetId}\n`);

    if (dryRun) {
      console.log(`      [dry-run] Would delete asset ${assetId}\n`);
      continue;
    }

    try {
      const asset = await contentfulEnvironment.getAsset(assetId);

      if (asset.isPublished && asset.isPublished()) {
        await asset.unpublish();
      }

      await asset.delete();
    } catch (err: any) {
      console.log(`      ❌ Failed to delete asset ${assetId}: ${err.message}`);
    }
  }

  console.log(
    `\n  ✅ Asset purge completed. Deleted ${deleted} asset${
      deleted === 1 ? "" : "s"
    }.\n`
  );
}
