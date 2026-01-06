import { uploadBufferAsAsset } from "../../../framework/contentful/upload-asset";
import { createEntry } from "../../../framework/contentful/create-entry";
import { CONTENT_TYPES } from "../../config/content-types";

export async function createCoachImage(coach: any, index: number) {
  const imgUrl = `https://randomuser.me/api/portraits/men/${index % 100}.jpg`;

  const resp = await fetch(imgUrl);
  const buffer = Buffer.from(await resp.arrayBuffer());

  const asset = await uploadBufferAsAsset(
    buffer,
    `${coach.slug}.jpg`,
    "image/jpeg",
    `Coach Image: ${coach.name}`
  );

  const imageWrapper = await createEntry(CONTENT_TYPES.IMAGE_WRAPPER, {
    title: { "en-US": `Coach Image: ${coach.name}` },
    media: {
      "en-US": {
        sys: {
          type: "Link",
          linkType: "Asset",
          id: asset.sys.id,
        },
      },
    },
    altText: { "en-US": coach.name },
  });

  return {
    image: {
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
