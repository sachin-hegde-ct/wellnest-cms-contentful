import { getContentfulContext } from "./environment";

export async function createEntry(
  contentType: string,
  fields: Record<string, unknown>,
) {
  const { contentfulEnvironment } = await getContentfulContext();

  const entry = await contentfulEnvironment.createEntry(contentType, {
    fields,
  });

  console.log(
    `        📝 Action: Create Entry, Content Type: ${contentType}, Id: ${entry.sys.id}\n`,
  );

  await entry.publish();

  return entry;
}
