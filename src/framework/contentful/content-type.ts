import { getContentfulContext } from "./environment";

export async function contentTypeExists(
  contentTypeId: string
): Promise<boolean> {
  const { contentfulEnvironment } = await getContentfulContext();

  try {
    await contentfulEnvironment.getContentType(contentTypeId);
    return true;
  } catch (err: any) {
    if (err?.name === "NotFound") {
      return false;
    }
      throw err;
  }
}
