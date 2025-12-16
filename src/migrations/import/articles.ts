import { assignArticleAuthors } from "../../utils/articles/assign-article-authors";
import { importArticles } from "../../utils/articles/import-articles";
import { uploadArticleImages } from "../../utils/articles/upload-article-images";

export const runArticleDataImport = async() => {
  console.log(
    `\n---------------------------------------------------------\n\n` +
      `🚀 Operation: Import, Entry: Article\n`
  );

  try {
    console.log(`\n 🔹 Uploading images & creating ImageWrapper entries...\n`);
    await uploadArticleImages();
    console.log(
      `\n   ✅ Uploading images & creating ImageWrapper entries COMPLETED. \n`
    );
  } catch (err) {
    console.error(
      `❌ Uploading images & creating ImageWrapper FAILED: ${
        (err as Error).message
      }`
    );
    process.exit(1);
  }

  try {
    console.log(`\n 🔹 Assigning Authors to articles...\n`);
    await assignArticleAuthors();
    console.log(`\n   ✅ Assigning Authors to articles COMPLETED.\n`);
  } catch (err) {
    console.error(
      `❌ Assigning Authors to articles FAILED: ${(err as Error).message}`
    );
    process.exit(1);
  }

  try {
    console.log(`\n 🔹 Creating Article entries...\n`);
    await importArticles();
    console.log(`\n   ✅ Creating Article entries COMPLETED.\n`);
  } catch (err) {
    console.error(
      `\n ❌ Creating Article entries FAILED: ${(err as Error).message}`
    );
    process.exit(1);
  }

  console.log(
    `\n🎉 Article entries imported successfully.\n` +
      `\n---------------------------------------------------------\n`
  );
}

// ------------------------------------------------------------------
// AUTO-EXECUTE WHEN RUN DIRECTLY
// ------------------------------------------------------------------
if (import.meta.url === `file://${process.argv[1]}`) {
  runArticleDataImport();
}
