import { isNotFoundError } from "../helpers/error";
import { getContentfulContext } from "./environment";
import { unPublishEntry } from "./unpublish-entry";

export async function deleteEntryById(id: string) {
  const { contentfulEnvironment } = await getContentfulContext();

  try {
    const entry = await contentfulEnvironment.getEntry(id);
    
    await unPublishEntry(entry);

    await entry.delete();
    console.log(`        ✅  Action: Delete Entry, Id: ${entry.sys.id}`);
  } catch (err: any) {
    if (isNotFoundError(err)) {
      console.log(`     ⚠️  Entry not found, skipped: ${id}\n`);
      return;
    }

    console.log(`     ❌ Failed to delete entry ${id}: ${err.message}\n`);
  }
}
