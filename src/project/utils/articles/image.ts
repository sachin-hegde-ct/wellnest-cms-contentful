/* eslint-disable @typescript-eslint/no-explicit-any */

import { createEntry } from "../../../framework/contentful/create-entry";
import { uploadBufferAsAsset } from "../../../framework/contentful/upload-asset";
import { CONTENT_TYPES } from "../../config/content-types";

export async function createArticleImage(article: any, index: number) {
  const imgUrl = `https://picsum.photos/seed/${index}/800/600`;

  const resp = await fetch(imgUrl);
  const buffer = Buffer.from(await resp.arrayBuffer());

  const asset = await uploadBufferAsAsset(
    buffer,
    `${article.slug}.jpg`,
    "image/jpeg",
    `Article Image: ${article.title}`,
  );

  const imageWrapper = await createEntry(CONTENT_TYPES.IMAGE_WRAPPER, {
    title: { "en-US": `Cover Image: ${article.title}` },
    media: {
      "en-US": {
        sys: {
          type: "Link",
          linkType: "Asset",
          id: asset.sys.id,
        },
      },
    },
    altText: { "en-US": article.title },
  });

  return {
    coverImage: {
      sys: {
        type: "Link",
        linkType: "Entry",
        id: imageWrapper.sys.id,
      },
    },
    assetId: asset.sys.id,
    imageWrapperId: imageWrapper.sys.id,
  };
}
