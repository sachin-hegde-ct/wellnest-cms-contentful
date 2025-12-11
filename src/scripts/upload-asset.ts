import { Environment } from "contentful-management";
import { getContentful } from "./contentful";

async function waitUntilProcessed(
  env: Environment,
  assetId: string,
  retries = 20,
  delayMs = 1500
) {
  for (let i = 0; i < retries; i++) {
    const asset = await env.getAsset(assetId);

    const file = asset.fields?.file?.["en-US"];
    if (file?.url) return asset;

    await new Promise((res) => setTimeout(res, delayMs));
  }
  throw new Error(`Asset ${assetId} did not finish processing in time.`);
}

export async function uploadBufferAsAsset(
  buffer: Buffer,
  fileName: string,
  contentType: string,
  title: string
) {
  const { contentfulEnvironment } = await getContentful();

  const arrayBuffer = new Uint8Array(buffer).buffer;

  const upload = await contentfulEnvironment.createUpload({
    file: arrayBuffer,
  });

  const asset = await contentfulEnvironment.createAsset({
    fields: {
      title: { "en-US": title },
      file: {
        "en-US": {
          fileName,
          contentType,
          uploadFrom: {
            sys: { type: "Link", linkType: "Upload", id: upload.sys.id },
          },
        },
      },
    },
  });

  await asset.processForAllLocales();

  const processed = await waitUntilProcessed(
    contentfulEnvironment,
    asset.sys.id
  );

  const published = await processed.publish();

  return published;
}
