import { getContentful } from "./contentful";

export async function deleteEntryById(id: string) {
  const { contentfulEnvironment } = await getContentful();

  try {
    const entry = await contentfulEnvironment.getEntry(id);

    if (entry.isPublished && entry.isPublished()) {
      await entry.unpublish();
    }
    await entry.delete();
    console.log(`     ✅ Deleted entry: ${id}`);
  } catch (err: any) {
    if (err?.name === "NotFound") {
      console.log(`   ⚠️ Skipped non-existing entry: ${id}`);
      return;
    }
    console.log(`   ❌ Failed to delete entry ${id}: ${err.message}`);
  }
}
