import { Entry } from "contentful-management";

export async function unPublishEntry(entry: Entry) {
  if (entry.isPublished && entry.isPublished()) {
    await entry.unpublish();
  }
}
