import { getContentful } from "./contentful";

export async function createEntry(contentType: string, fields: any) {
  const { contentfulEnvironment } = await getContentful();

  const entry = await contentfulEnvironment.createEntry(contentType, {
    fields,
  });

  await entry.publish();
  
  return entry;
}
