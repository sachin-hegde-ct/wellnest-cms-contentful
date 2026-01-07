import { Environment, Asset } from "contentful-management";
import { getContentfulContext } from "./environment";

const DEFAULT_LOCALE = "en-US";

type UploadOptions = {
  retries?: number;
  delayMs?: number;
};

/* ------------------------------------------------------------------ */
/* Wait until asset processing completes                               */
/* ------------------------------------------------------------------ */

async function waitForAssetProcessing(
  env: Environment,
  assetId: string,
  { retries = 20, delayMs = 1500 }: UploadOptions = {},
): Promise<Asset> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const asset = await env.getAsset(assetId);

    const file = asset.fields?.file?.[DEFAULT_LOCALE];
    if (file?.url) {
      return asset;
    }

    await new Promise((res) => setTimeout(res, delayMs));
  }

  throw new Error(
    `Asset '${assetId}' did not finish processing after ${retries} attempts.`,
  );
}

/* ------------------------------------------------------------------ */
/* Upload buffer as published Contentful asset                         */
/* ------------------------------------------------------------------ */

export async function uploadBufferAsAsset(
  buffer: Buffer,
  fileName: string,
  contentType: string,
  title: string,
  options?: UploadOptions,
): Promise<Asset> {
  const { contentfulEnvironment } = await getContentfulContext();

  // Contentful expects ArrayBuffer
  const arrayBuffer = new Uint8Array(buffer).buffer;

  // --------------------------------------------------
  // 1. Upload binary
  // --------------------------------------------------
  const upload = await contentfulEnvironment.createUpload({
    file: arrayBuffer,
  });

  // --------------------------------------------------
  // 2. Create asset
  // --------------------------------------------------
  const asset = await contentfulEnvironment.createAsset({
    fields: {
      title: { [DEFAULT_LOCALE]: title },
      file: {
        [DEFAULT_LOCALE]: {
          fileName,
          contentType,
          uploadFrom: {
            sys: {
              type: "Link",
              linkType: "Upload",
              id: upload.sys.id,
            },
          },
        },
      },
    },
  });

  // --------------------------------------------------
  // 3. Process asset
  // --------------------------------------------------
  await asset.processForAllLocales();

  const processed = await waitForAssetProcessing(
    contentfulEnvironment,
    asset.sys.id,
    options,
  );

  console.log(`        🖼️  Action: Upload Asset, Id: ${processed.sys.id}\n`);

  // --------------------------------------------------
  // 4. Publish
  // --------------------------------------------------
  return processed.publish();
}
