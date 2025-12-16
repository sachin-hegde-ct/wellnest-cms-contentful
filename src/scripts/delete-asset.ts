import { getContentful } from "./contentful";

export async function deleteAssetById(id: string) {
  const { contentfulEnvironment } = await getContentful();

  try {
    const asset = await contentfulEnvironment.getAsset(id);

    if (asset.isPublished && asset.isPublished()) {
      await asset.unpublish();
    }
    await asset.delete();
    console.log(`     ✅ Deleted asset: ${id}`);
  } catch (err: any) {
    if (err?.name === "NotFound") {
      console.log(`     ⚠️ Skipped non-existing asset: ${id}`);
      return;
    }
    console.log(`     ❌ Failed to delete asset ${id}: ${err.message}`);
  }
}
