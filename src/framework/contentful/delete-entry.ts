import { getContentfulContext } from "./environment";


export async function deleteEntryById(id: string) {
  const { contentfulEnvironment } = await getContentfulContext();

  try {
    const entry = await contentfulEnvironment.getEntry(id);

    if (entry.isPublished && entry.isPublished()) {
      await entry.unpublish();
    }

    await entry.delete();
    console.log(`      ✅ Deleted entry: ${id}\n`);
  } catch (err: any) {
    if (err?.name === "NotFound") {
      console.log(`      ⚠️  Entry not found, skipped: ${id}\n`);
      return;
    }

    console.log(`      ❌ Failed to delete entry ${id}: ${err.message}\n`);
  }
}
