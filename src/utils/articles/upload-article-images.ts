import fs from "fs/promises";
import { uploadBufferAsAsset } from "../../scripts/upload-asset";
import { createEntry } from "../../scripts/create-entry";
import { CONTENT_TYPES } from "../../constants/content-types";
import { ARTICLE_DATA_DIR } from "../../constants/data-dir";

export async function uploadArticleImages() {
  const articles = JSON.parse(
    await fs.readFile(ARTICLE_DATA_DIR.SOURCE, "utf8")
  );

  const updated = [...articles];
  const imageRefs: Record<string, any> = {};

  for (let i = 0; i < updated.length; i++) {
    const article = updated[i];

    console.log(
      `\n   [${i + 1}/${updated.length}] Article: ${article.title}\n`
    );

    const imgUrl = `https://picsum.photos/seed/${i}/800/600`;
    console.log(`     ⬇️  Downloading image...\n`);

    const resp = await fetch(imgUrl);
    const buffer = Buffer.from(await resp.arrayBuffer());
    const fileName = `${article.slug}.jpg`;

    console.log(`     ⬆️  Uploading asset to contentful...\n`);
    const asset = await uploadBufferAsAsset(
      buffer,
      fileName,
      "image/jpeg",
      `Article Image: ${article.title}`
    );

    console.log(`     🖼️  Creating ImageWrapper entry...\n`);
    const imageWrapper = await createEntry(CONTENT_TYPES.IMAGE_WRAPPER, {
      title: { "en-US": `Cover Image: ${article.title}` },
      media: {
        "en-US": { sys: { type: "Link", linkType: "Asset", id: asset.sys.id } },
      },
      altText: { "en-US": article.title },
    });

    updated[i].coverImage = {
      sys: { type: "Link", linkType: "Entry", id: imageWrapper.sys.id },
    };

    imageRefs[article.slug] = {
      assetId: asset.sys.id,
      wrapperId: imageWrapper.sys.id,
    };
  }

  await fs.writeFile(ARTICLE_DATA_DIR.FINAL, JSON.stringify(updated, null, 2));
  await fs.writeFile(
    ARTICLE_DATA_DIR.IMAGES_MAP,
    JSON.stringify(imageRefs, null, 2)
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  uploadArticleImages();
}
