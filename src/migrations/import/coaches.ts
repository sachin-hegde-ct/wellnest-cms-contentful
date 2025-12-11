import { createSocialLinksForCoaches } from "../../utils/coach/create-social-links";
import { importCoaches } from "../../utils/coach/import-coaches";
import { uploadCoachImages } from "../../utils/coach/upload-coach-images";

export const runCoachDataImport = async () => {
  console.log(`\n========== 🏗️  IMPORT COACH DATA ==========\n`);

  try {
    console.log(
      `\n 🔹 Uploading images & creating ImageWrapper entries...\n`
    );
    await uploadCoachImages();
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
    console.log(`\n 🔹 Creating SocialLinks entries...\n`);
    await createSocialLinksForCoaches();
    console.log(`\n   ✅ Creating SocialLinks entries COMPLETED.\n`);
  } catch (err) {
    console.error(
      `❌ Creating SocialLinks entries FAILED: ${(err as Error).message}`
    );
    process.exit(1);
  }

  try {
    console.log(`\n 🔹 Creating Coach entries...\n`);
    await importCoaches();
    console.log(`\n   ✅ Creating Coach entries COMPLETED.\n`);
  } catch (err) {
    console.error(
      `\n ❌ Creating Coach entries FAILED: ${(err as Error).message}`
    );
    process.exit(1);
  }

  console.log(`\n🎉 ALL COACH DATA IMPORTED SUCCESSFULLY\n`);
  console.log(`===========================================================\n`);
};

// Auto-run when called from CLI:
if (import.meta.url === `file://${process.argv[1]}`) {
  runCoachDataImport();
}
