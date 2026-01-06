import { isNotFoundError } from "../helpers/error";
import { getContentfulContext } from "./environment";

/**
 * Deletes an asset safely.
 * - Unpublishes if needed
 * - Skips if asset does not exist
 */
export async function deleteAssetById(id: string) {
  const { contentfulEnvironment } = await getContentfulContext();

  try {
    const asset = await contentfulEnvironment.getAsset(id);

    if (asset.isPublished && asset.isPublished()) {
      await asset.unpublish();
    }

    await asset.delete();
    console.log(`        🗑️   Action: Delete Asset, Id: ${asset.sys.id}`);
  } catch (err: any) {
    if (isNotFoundError(err)) {
      console.log(`     ⚠️  Skipped non-existing asset: ${id}`);
      return;
    }

    console.log(`     ❌ Failed to delete asset ${id}: ${err.message}`);
  }
}
