import { getContentfulContext } from "./environment";

export async function createEntry(
  contentType: string,
  fields: Record<string, any>
) {
  const { contentfulEnvironment } = await getContentfulContext();

  const entry = await contentfulEnvironment.createEntry(contentType, {
    fields,
  });

  console.log(
    `\n        📝 Action: Create Entry, Content Type: ${contentType}, Id: ${entry.sys.id}`
  );
  
  await entry.publish();

  return entry;
}
