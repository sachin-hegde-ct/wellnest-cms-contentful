import fs from "fs/promises";
import { deleteEntryById } from "../../scripts/delete-entry";
import { deleteAssetById } from "../../scripts/delete-asset";
import { COACH_DATA_DIR } from "../../constants/data-dir";

export const cleanupCoaches = async () => {
  console.log(`\n========== 🗑️  CLEANUP COACH DATA ==========\n`);

  const finalJsonPath = COACH_DATA_DIR.FINAL;
  const imagesMapPath = COACH_DATA_DIR.IMAGES_MAP;
  const socialLinksMapPath = COACH_DATA_DIR.SOCIAL_LINKS_MAP;

  let finalCoaches: any[] = [];
  let imagesMap: Record<string, any> = {};
  let socialMap: Record<string, any> = {};

  // ---------- Read JSON files safely ----------
  try {
    finalCoaches = JSON.parse(await fs.readFile(finalJsonPath, "utf8"));
  } catch {
    console.log(` ⚠️  No ${finalJsonPath} found. Skipping entry cleanup.\n`);
  }

  try {
    imagesMap = JSON.parse(await fs.readFile(imagesMapPath, "utf8"));
  } catch {
    console.log(` ⚠️  No ${imagesMapPath} found. Skipping asset cleanup.\n`);
  }

  try {
    socialMap = JSON.parse(await fs.readFile(socialLinksMapPath, "utf8"));
  } catch {
    console.log(
      ` ⚠️  No ${socialLinksMapPath} found. Skipping SocialLinks cleanup.\n`
    );
  }

  // ---------- Delete all related content ----------
  for (const coach of finalCoaches) {
    const slug = coach.slug;

    console.log(`\n 🧹 Removing coach: ${slug}\n`);

    const imageInfo = imagesMap?.[slug];
    const socialLinksId = socialMap?.[slug];
    const coachEntryId = coach?.sys?.id;

    // 1. Delete Coach entry
    if (coachEntryId) {
      await deleteEntryById(coachEntryId);
    }

    // 2. Delete SocialLinks entry
    if (socialLinksId) {
      await deleteEntryById(socialLinksId);
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
        console.log(`   ⚠️ File not found, skipping: ${filePath}`);
      } else {
        console.log(`   ❌ Could not delete ${filePath}: ${err.message}`);
      }
    }
  }

  await safeDelete(finalJsonPath);
  await safeDelete(imagesMapPath);
  await safeDelete(socialLinksMapPath);

  console.log(`\n🎉 CLEANUP COMPLETE.`);
  console.log(`\n ===================================================\n`);
};

// Auto-run when executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  cleanupCoaches();
}
