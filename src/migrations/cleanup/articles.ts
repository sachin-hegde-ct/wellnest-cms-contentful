import fs from "fs/promises";
import { deleteEntryById } from "../../scripts/delete-entry";
import { deleteAssetById } from "../../scripts/delete-asset";
import { ARTICLE_DATA_DIR } from "../../constants/data-dir";

export const cleanupArticles = async () => {
  console.log(
    `\n---------------------------------------------------------\n\n` +
      `🧤 Operation: Cleanup, Entry: Article\n`
  );

  const finalJsonPath = ARTICLE_DATA_DIR.FINAL;
  const imagesMapPath = ARTICLE_DATA_DIR.IMAGES_MAP;
  const authorsMapPath = ARTICLE_DATA_DIR.AUTHORS_MAP;

  let finalArticles: any[] = [];
  let imagesMap: Record<string, any> = {};
  let authorsMap: Record<string, any> = {};

  // ---------- Read JSON files safely ----------
  try {
    finalArticles = JSON.parse(await fs.readFile(finalJsonPath, "utf8"));
  } catch {
    console.log(`   ⚠️  No ${finalJsonPath} found. Skipping entry cleanup.\n`);
  }

  try {
    imagesMap = JSON.parse(await fs.readFile(imagesMapPath, "utf8"));
  } catch {
    console.log(`   ⚠️  No ${imagesMapPath} found. Skipping asset cleanup.\n`);
  }

  try {
    authorsMap = JSON.parse(await fs.readFile(authorsMapPath, "utf8"));
  } catch {
    console.log(
      `   ⚠️  No ${authorsMapPath} found. Skipping authors map cleanup.\n`
    );
  }

  // ---------- Delete all related content ----------
  for (const [index, article] of finalArticles.entries()) {
    const slug = article.slug;

    console.log(
      `\n [${index + 1}/${finalArticles.length}] 🧹 Removing Article: ${
        article.title
      }\n`
    );

    const imageInfo = imagesMap?.[slug];
    const authorsId = authorsMap?.[slug];
    const articleEntryId = article?.sys?.id;

    // 1. Delete Article entry
    if (articleEntryId) {
      await deleteEntryById(articleEntryId);
    }

    // 2. Delete Authors entry
    if (authorsId) {
      // await deleteEntryById(authorsId);
    }

    // 3. Delete ImageWrapper entry
    if (imageInfo?.imageWrapperId) {
      await deleteEntryById(imageInfo.imageWrapperId);
    }

    // 4. Delete Asset
    if (imageInfo?.assetId) {
      await deleteAssetById(imageInfo.assetId);
    }
  }

  // ---------- Delete JSON files ----------
  async function safeDelete(filePath: string) {
    try {
      await fs.unlink(filePath);
    } catch (err: any) {
      if (err.code === "ENOENT") {
        console.log(`   ⚠️  File not found, skipping: ${filePath}`);
      } else {
        console.log(`   ❌ Could not delete ${filePath}: ${err.message}`);
      }
    }
  }

  await safeDelete(finalJsonPath);
  await safeDelete(imagesMapPath);
  await safeDelete(authorsMapPath);

  console.log(
    `\n\n🎉 Article entries cleaned up successfully.\n` +
      `\n---------------------------------------------------------\n`
  );
};

// Auto-run when executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  cleanupArticles();
}
