/* eslint-disable @typescript-eslint/no-explicit-any */
import { uploadBufferAsAsset } from "../../../framework/contentful/upload-asset";
import { createEntry } from "../../../framework/contentful/create-entry";
import { CONTENT_TYPES } from "../../config/content-types";

export async function createProgramImage(program: any, index: number) {
  const imgUrl = `https://picsum.photos/seed/program-${index}/1200/800`;

  const resp = await fetch(imgUrl);
  const buffer = Buffer.from(await resp.arrayBuffer());

  const asset = await uploadBufferAsAsset(
    buffer,
    `${program.slug}.jpg`,
    "image/jpeg",
    `Program Image: ${program.title}`,
  );

  const imageWrapper = await createEntry(CONTENT_TYPES.IMAGE_WRAPPER, {
    title: { "en-US": `Program Image: ${program.title}` },
    media: {
      "en-US": {
        sys: {
          type: "Link",
          linkType: "Asset",
          id: asset.sys.id,
        },
      },
    },
    altText: { "en-US": program.title },
  });

  return {
    imageLink: {
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
