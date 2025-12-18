import { getContentfulContext } from "./environment";

export async function createEntry(
  contentType: string,
  fields: Record<string, any>
) {
  const { contentfulEnvironment } = await getContentfulContext();

  const entry = await contentfulEnvironment.createEntry(contentType, {
    fields,
  });

  await entry.publish();
  return entry;
}
