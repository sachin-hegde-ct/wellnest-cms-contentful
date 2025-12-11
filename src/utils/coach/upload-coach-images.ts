import fs from "fs/promises";
import { uploadBufferAsAsset } from "../../scripts/upload-asset";
import { createEntry } from "../../scripts/create-entry";
import { COACH_DATA_DIR } from "../../constants/data-dir";
import { CONTENT_TYPES } from "../../constants/content-types";

export async function uploadCoachImages() {
  const input = JSON.parse(await fs.readFile(COACH_DATA_DIR.SOURCE, "utf8"));

  const output = [...input];
  const imagesMap: Record<string, any> = {};

  for (const coach of output) {
    console.log(`   ⬇️  Downloading image for ${coach.name}...`);

    const res = await fetch(
      "https://randomuser.me/api/?seed=picture&inc=picture"
    );
    const json = await res.json();
    const imgUrl = json.results[0].picture.large;

    const imgResp = await fetch(imgUrl);
    const buffer = Buffer.from(await imgResp.arrayBuffer());
    const fileName = `${coach.slug}.jpg`;

    console.log(`   ⬆️  Uploading asset for ${coach.name}`);
    const asset = await uploadBufferAsAsset(
      buffer,
      fileName,
      "image/jpeg",
      coach.name
    );

    const imageWrapper = await createEntry(CONTENT_TYPES.IMAGE_WRAPPER, {
      title: { "en-US": `Profile Image: ${coach.name} `},
      media: {
        "en-US": { sys: { type: "Link", linkType: "Asset", id: asset.sys.id } },
      },
      altText: { "en-US": coach.name },
    });
    console.log(`   🖼️  Created ImageWrapper entry\n`);

    // update mapping
    imagesMap[coach.slug] = {
      assetId: asset.sys.id,
      imageWrapperId: imageWrapper.sys.id,
    };

    // attach to final coach JSON
    coach.profilePicture = {
      sys: {
        type: "Link",
        linkType: "Entry",
        id: imageWrapper.sys.id,
      },
    };
  }

  await fs.writeFile(COACH_DATA_DIR.FINAL, JSON.stringify(output, null, 2));
  await fs.writeFile(
    COACH_DATA_DIR.IMAGES_MAP,
    JSON.stringify(imagesMap, null, 2)
  );

  console.log(`   📷 Image upload complete.`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  uploadCoachImages();
}
