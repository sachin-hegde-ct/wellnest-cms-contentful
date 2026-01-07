/* eslint-disable @typescript-eslint/no-explicit-any */

import { createArticleImage } from "./image";
import { assignRandomArticleAuthor } from "./author";
import { createArticleEntry } from "./create-entry";
import { ARTICLE_DATA_DIR } from "../../config/data-dir";
import { readDataFile } from "../../../framework/fs/read-data-file";
import { writeDataFile } from "../../../framework/fs/write-data-file";

export async function importArticles({ dryRun }: { dryRun: boolean }) {
  const sourceArticles = await readDataFile<any[]>(ARTICLE_DATA_DIR.SOURCE);

  if (!sourceArticles || sourceArticles.length === 0) {
    console.log(
      `\n⚠️  No source articles found at ${ARTICLE_DATA_DIR.SOURCE}\n`,
    );
    return;
  }

  const finalArticles: any[] = [];
  const imageRefs: Record<string, any> = {};
  const authorRefs: Record<string, any> = {};

  for (let index = 0; index < sourceArticles.length; index++) {
    const article = sourceArticles[index];

    console.log(
      `\n   📰 [${index + 1}/${sourceArticles.length}] ${article.title}`,
    );

    /* -------------------------------------------------
     * 1. Image (download → upload → image wrapper)
     * ------------------------------------------------- */
    let image: any = null;

    if (dryRun) {
      console.log(`      🖼️  [DRY RUN] Would create ImageWrapper entry`);
    } else {
      image = await createArticleImage(article, index);
      imageRefs[article.slug] = {
        assetId: image.assetId,
        imageWrapperId: image.imageWrapperId,
      };
    }

    /* -------------------------------------------------
     * 2. Author
     * ------------------------------------------------- */
    let author: any = null;

    if (!dryRun) {
      author = await assignRandomArticleAuthor();
      authorRefs[article.slug] = {
        coach: author.coachId,
      };
    }

    /* -------------------------------------------------
     * 3. Create article entry
     * ------------------------------------------------- */
    let entryId: string | null = null;

    if (dryRun) {
      console.log(
        `      📝 [DRY RUN] Would create Article entry linked to image and author`,
      );
    } else {
      entryId = await createArticleEntry(
        article,
        image.coverImage,
        author.author,
      );

      article.sys = {
        id: entryId,
        type: "Entry",
        linkType: "Entry",
      };

      finalArticles.push(article);
    }

    /* -------------------------------------------------
     * 4. Persist state
     * ------------------------------------------------- */
    await writeDataFile(ARTICLE_DATA_DIR.FINAL, finalArticles, { dryRun });
    await writeDataFile(ARTICLE_DATA_DIR.IMAGES_MAP, imageRefs, { dryRun });

    console.log(
      dryRun
        ? `\n   🟡 Dry run completed for article`
        : `\n   ✅ Article imported successfully`,
    );
  }

  console.log(
    dryRun
      ? `\n🧪 Dry run completed. No data was written.\n`
      : `\n🎉 All articles imported successfully.\n`,
  );
}
