import fs from "fs/promises";
import { uploadBufferAsAsset } from "../../scripts/upload-asset";
import { createEntry } from "../../scripts/create-entry";
import { CONTENT_TYPES } from "../../constants/content-types";
import { PROGRAM_DATA_DIR } from "../../constants/data-dir";

export async function uploadProgramImages() {
  const programs = JSON.parse(
    await fs.readFile(PROGRAM_DATA_DIR.SOURCE, "utf8")
  );

  const updated = [...programs];
  const imageRefs: Record<string, any> = {};

  for (let i = 0; i < updated.length; i++) {
    const program = updated[i];

    console.log(
      `\n   [${i + 1}/${updated.length}] Program: ${program.title}\n`
    );

    const imgUrl = `https://picsum.photos/seed/program-${i}/1200/600`;
    console.log(`     ⬇️  Downloading banner image...\n`);

    const resp = await fetch(imgUrl);
    const buffer = Buffer.from(await resp.arrayBuffer());
    const fileName = `${program.slug}.jpg`;

    console.log(`     ⬆️  Uploading asset to contentful...\n`);
    const asset = await uploadBufferAsAsset(
      buffer,
      fileName,
      "image/jpeg",
      `Banner Image: ${program.title}`
    );

    console.log(`     🖼️  Creating ImageWrapper entry...\n`);
    const imageWrapper = await createEntry(CONTENT_TYPES.IMAGE_WRAPPER, {
      title: { "en-US": `Banner Image: ${program.title}` },
      media: {
        "en-US": { sys: { type: "Link", linkType: "Asset", id: asset.sys.id } },
      },
      altText: { "en-US": program.title },
    });

    updated[i].bannerImage = {
      sys: { type: "Link", linkType: "Entry", id: imageWrapper.sys.id },
    };

    imageRefs[program.slug] = {
      assetId: asset.sys.id,
      wrapperId: imageWrapper.sys.id,
    };
  }

  await fs.writeFile(PROGRAM_DATA_DIR.FINAL, JSON.stringify(updated, null, 2));
  await fs.writeFile(
    PROGRAM_DATA_DIR.IMAGES_MAP,
    JSON.stringify(imageRefs, null, 2)
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  uploadProgramImages();
}
