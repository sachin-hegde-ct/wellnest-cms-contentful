import { COACH_DATA_DIR } from "../../config/data-dir";

import { createCoachImage } from "./image";
import { createCoachSocialLinks } from "./social-links";
import { createCoachEntry } from "./create-entry";
import { readDataFile } from "../../../framework/fs/read-data-file";
import { writeDataFile } from "../../../framework/fs/write-data-file";

export async function importCoaches({ dryRun }: { dryRun: boolean }) {
  const sourceCoaches = await readDataFile<any[]>(COACH_DATA_DIR.SOURCE);

  if (!sourceCoaches || sourceCoaches.length === 0) {
    console.log(`\n⚠️  No source coaches found at ${COACH_DATA_DIR.SOURCE}\n`);
    return;
  }

  const finalCoaches: any[] = [];
  const imageMap: Record<string, any> = {};
  const socialMap: Record<string, any> = {};

  for (let index = 0; index < sourceCoaches.length; index++) {
    const coach = sourceCoaches[index];
    const key = coach.slug ?? coach.name;

    console.log(
      `\n    [${index + 1}/${sourceCoaches.length}] 🧑 ${coach.name}`
    );

    /* -------------------------------------------------
     * 1. Image
     * ------------------------------------------------- */
    let image: any = null;

    if (dryRun) {
      console.log(
        `       🖼️  [DRY RUN] Would create ImageWrapper entry`
      );
    } else {
      image = await createCoachImage(coach, index);
      imageMap[key] = {
        assetId: image.assetId,
        imageWrapperId: image.imageWrapperId,
      };
    }

    /* -------------------------------------------------
     * 2. Social links
     * ------------------------------------------------- */
    let socialLinksId: string | null = null;

    if (!dryRun) {
      socialLinksId = await createCoachSocialLinks(coach);
      if (socialLinksId) {
        socialMap[key] = socialLinksId;
      }
    }

    /* -------------------------------------------------
     * 3. Coach entry
     * ------------------------------------------------- */
    let entryId: string | null = null;

    if (dryRun) {
      console.log(
        `       👤 [DRY RUN] Would create Coach entry linked to image & social links`
      );
    } else {
      entryId = await createCoachEntry(coach, image.image, socialLinksId);

      coach.sys = {
        id: entryId,
        type: "Entry",
        linkType: "Entry",
      };

      finalCoaches.push(coach);
    }

    /* -------------------------------------------------
     * 4. Persist files
     * ------------------------------------------------- */
    await writeDataFile(COACH_DATA_DIR.FINAL, finalCoaches, { dryRun });
    await writeDataFile(COACH_DATA_DIR.IMAGES_MAP, imageMap, { dryRun });
    await writeDataFile(COACH_DATA_DIR.SOCIAL_LINKS_MAP, socialMap, { dryRun });

    console.log(
      dryRun
        ? `   🟡 Dry run completed for coach "${coach.name}"`
        : `\n   ✅ Coach "${coach.name}" imported successfully\n`
    );
  }

  console.log(
    dryRun
      ? `\n🧪 Dry run completed. No data was written.\n`
      : `\n🎉 All coaches imported successfully.\n`
  );
}
