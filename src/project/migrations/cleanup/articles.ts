import { Migration } from "../../../framework/types/migration";
import { contentTypeExists } from "../../../framework/contentful/content-type-check";
import { deleteEntryById } from "../../../framework/contentful/delete-entry";
import { deleteAssetById } from "../../../framework/contentful/delete-asset";
import { deleteDataFile } from "../../../framework/fs/delete-data-file";
import { ARTICLE_DATA_DIR } from "../../config/data-dir";
import { CONTENT_TYPES } from "../../config/content-types";
import { readDataFile } from "../../../framework/fs/read-data-file";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const cleanupArticles: Migration = {
  id: "cleanup-entry-articles",
  kind: "cleanup",
  target: CONTENT_TYPES.ARTICLE,

  async run({ dryRun }) {
    console.log("\n" + "-".repeat(60) + "\n");
    console.log(`\n🧤 Cleanup → Articles\n`);

    // ------------------------------------------------------
    // 1️⃣ PREFLIGHT
    // ------------------------------------------------------

    const exists = await contentTypeExists(CONTENT_TYPES.ARTICLE);

    if (!exists) {
      console.log(
        `ℹ️  Content type '${CONTENT_TYPES.ARTICLE}' does not exist.\n`
      );
      console.log("\n" + "-".repeat(60) + "\n");
      return;
    }

    // ------------------------------------------------------
    // 2️⃣ LOAD STATE FILES
    // ------------------------------------------------------

    const articles = await readDataFile<any[]>(ARTICLE_DATA_DIR.FINAL);

    if (!articles) {
      return;
    }

    const imagesMap = await readDataFile<Record<string, any>>(
      ARTICLE_DATA_DIR.IMAGES_MAP
    );

    // ------------------------------------------------------
    // 3️⃣ STREAM CLEANUP (ONE ARTICLE AT A TIME)
    // ------------------------------------------------------

    const total = articles.length;

    for (let index = 0; index < total; index++) {
      const article = articles[index];
      const slug = article.slug;
      const imageInfo = imagesMap?.[slug];

      console.log(
        `\n [${index + 1}/${total}] 🧹 Removing Article: ${article.title}\n`
      );

      // -------------------------
      // Article entry
      // -------------------------
      if (article?.sys?.id) {
        if (dryRun) {
          console.log(`   [dry-run] Would delete Article ${article.sys.id}`);
        } else {
          await deleteEntryById(article.sys.id);
        }
      }

      // -------------------------
      // ImageWrapper entry
      // -------------------------
      if (imageInfo?.imageWrapperId) {
        if (dryRun) {
          console.log(
            `   [dry-run] Would delete ImageWrapper ${imageInfo.imageWrapperId}`
          );
        } else {
          await deleteEntryById(imageInfo.imageWrapperId);
        }
      }

      // -------------------------
      // Asset
      // -------------------------
      if (imageInfo?.assetId) {
        if (dryRun) {
          console.log(`   [dry-run] Would delete Asset ${imageInfo.assetId}`);
        } else {
          await deleteAssetById(imageInfo.assetId);
        }
      }
    }

    // ------------------------------------------------------
    // 4️⃣ CLEAN LOCAL STATE
    // ------------------------------------------------------

    await deleteDataFile(ARTICLE_DATA_DIR.FINAL, dryRun);
    await deleteDataFile(ARTICLE_DATA_DIR.IMAGES_MAP, dryRun);

    if (dryRun) {
      console.log(
        `\n\n🧪 Dry run summary: ${total} article(s) would be deleted.\n`
      );
    } else {
      console.log(`\n\n🎉 Cleanup completed for Articles.\n`);
    }
    console.log("\n" + "-".repeat(60) + "\n");
  },
};

export default cleanupArticles;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, cleanupArticles);
