import { Migration } from "../../../framework/types/migration";
import { contentTypeExists } from "../../../framework/contentful/content-type-check";
import { deleteEntryById } from "../../../framework/contentful/delete-entry";
import { deleteAssetById } from "../../../framework/contentful/delete-asset";
import { deleteDataFile } from "../../../framework/fs/delete-data-file";
import { COACH_DATA_DIR } from "../../config/data-dir";
import { CONTENT_TYPES } from "../../config/content-types";
import { readDataFile } from "../../../framework/fs/read-data-file";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const cleanupCoaches: Migration = {
  id: "cleanup-entry-coaches",
  kind: "cleanup",
  target: CONTENT_TYPES.COACH,

  async run({ dryRun }) {
    console.log("\n" + "-".repeat(60) + "\n");
    console.log(`\n🧤 Cleanup → Coaches\n`);

    // ------------------------------------------------------
    // 1️⃣ PREFLIGHT
    // ------------------------------------------------------

    const exists = await contentTypeExists(CONTENT_TYPES.COACH);

    if (!exists) {
      console.log(`ℹ️  Content type '${CONTENT_TYPES.COACH}' does not exist.\n`);
      console.log("\n" + "-".repeat(60) + "\n");
      return;
    }

    // ------------------------------------------------------
    // 2️⃣ LOAD STATE FILES
    // ------------------------------------------------------

    const coaches = await readDataFile<any[]>(COACH_DATA_DIR.FINAL);

    if (!coaches) {
      return;
    }

    const imageMap = await readDataFile<Record<string, any>>(
      COACH_DATA_DIR.IMAGES_MAP
    );

    const socialMap = await readDataFile<Record<string, any>>(
      COACH_DATA_DIR.SOCIAL_LINKS_MAP
    );

    // ------------------------------------------------------
    // 3️⃣ STREAM CLEANUP (ONE COACH AT A TIME)
    // ------------------------------------------------------

    const total = coaches.length;

    for (let index = 0; index < total; index++) {
      const coach = coaches[index];
      const coachKey = coach.slug ?? coach.name;

      const imageInfo = imageMap?.[coachKey];
      const socialId = socialMap?.[coachKey];

      console.log(
        `\n    [${index + 1}/${total}] 🧹 Removing Coach: ${coach.name}\n`
      );

      // -------------------------
      // Coach entry
      // -------------------------
      if (coach?.sys?.id) {
        if (dryRun) {
          console.log(`   [dry-run] Would delete Coach ${coach.sys.id}`);
        } else {
          await deleteEntryById(coach.sys.id);
        }
      }

      // -------------------------
      // SocialLinks entry
      // -------------------------
      if (socialId) {
        if (dryRun) {
          console.log(`   [dry-run] Would delete SocialLinks ${socialId}`);
        } else {
          await deleteEntryById(socialId);
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

    await deleteDataFile(COACH_DATA_DIR.FINAL, dryRun);
    await deleteDataFile(COACH_DATA_DIR.IMAGES_MAP, dryRun);
    await deleteDataFile(COACH_DATA_DIR.SOCIAL_LINKS_MAP, dryRun);

    if (dryRun) {
      console.log(
        `\n\n🧪 Dry run summary: ${total} coach(es) would be deleted.\n`
      );
    } else {
      console.log(`\n\n🎉 Cleanup completed for Coaches.\n`);
    }
    console.log("\n" + "-".repeat(60) + "\n");
  },
};

export default cleanupCoaches;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, cleanupCoaches);
