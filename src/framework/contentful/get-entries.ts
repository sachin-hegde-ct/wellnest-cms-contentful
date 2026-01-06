import { getContentfulContext } from "./environment";

export async function getEntries({
  content_type,
  limit = 1000,
  skip = 0,
}: {
  content_type: string;
  limit?: number;
  skip?: number;
}) {
  const { contentfulEnvironment } = await getContentfulContext();
  return await contentfulEnvironment.getEntries({
    content_type,
    limit,
    skip,
  });
}
