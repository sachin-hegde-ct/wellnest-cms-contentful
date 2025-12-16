import fs from "fs/promises";
import { uploadBufferAsAsset } from "../../scripts/upload-asset";
import { createEntry } from "../../scripts/create-entry";
import { COACH_DATA_DIR } from "../../constants/data-dir";
import { CONTENT_TYPES } from "../../constants/content-types";

export async function uploadCoachImages() {
  const input = JSON.parse(await fs.readFile(COACH_DATA_DIR.SOURCE, "utf8"));

  const output = [...input];
  const imagesMap: Record<string, any> = {};

  const totalCoaches = output.length;

  const response = await fetch(
    `https://randomuser.me/api/?seed=picture&inc=picture&results=${totalCoaches}`
  );

  const json = await response.json();
  const pictures = json.results.map((r: any) => r.picture.large);

  for (let i = 0; i < output.length; i++) {
    const coach = output[i];
    const imgUrl = pictures[i];

    console.log(`\n   [${i + 1}/${output.length}] Coach: ${coach.name}\n`);

    console.log(`     ⬇️  Downloading image...\n`);

    const imgResp = await fetch(imgUrl);
    const buffer = Buffer.from(await imgResp.arrayBuffer());
    const fileName = `${coach.slug}.jpg`;

    console.log(`     ⬆️  Uploading asset to contentful...\n`);

    const asset = await uploadBufferAsAsset(
      buffer,
      fileName,
      "image/jpeg",
      `Coach Image: ${coach.name}`
    );

    console.log(`     🖼️  Creating ImageWrapper entry...\n`);
    const imageWrapper = await createEntry(CONTENT_TYPES.IMAGE_WRAPPER, {
      title: { "en-US": `Profile Image: ${coach.name}` },
      media: {
        "en-US": { sys: { type: "Link", linkType: "Asset", id: asset.sys.id } },
      },
      altText: { "en-US": coach.name },
    });

    imagesMap[coach.slug] = {
      assetId: asset.sys.id,
      imageWrapperId: imageWrapper.sys.id,
    };

    // Attach to final coach JSON
    coach.profilePicture = {
      sys: {
        type: "Link",
        linkType: "Entry",
        id: imageWrapper.sys.id,
      },
    };
  }

  // ---------------------------------------------------------
  // WRITE OUTPUT FILES
  // ---------------------------------------------------------
  await fs.writeFile(COACH_DATA_DIR.FINAL, JSON.stringify(output, null, 2));
  await fs.writeFile(
    COACH_DATA_DIR.IMAGES_MAP,
    JSON.stringify(imagesMap, null, 2)
  );
}

// AUTO-RUN WHEN EXECUTED DIRECTLY
if (import.meta.url === `file://${process.argv[1]}`) {
  uploadCoachImages();
}
