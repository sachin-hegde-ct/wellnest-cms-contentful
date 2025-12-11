import fs from "fs/promises";
import { createEntry } from "../../scripts/create-entry";
import { COACH_DATA_DIR } from "../../constants/data-dir";
import { CONTENT_TYPES } from "../../constants/content-types";

export async function importCoaches() {
  const finalPath = COACH_DATA_DIR.FINAL;

  const final = JSON.parse(await fs.readFile(finalPath, "utf8"));

  for (const [index, coach] of final.entries()) {

    const entry = await createEntry(CONTENT_TYPES.COACH, {
      name: { "en-US": coach.name },
      slug: { "en-US": coach.slug },
      bio: { "en-US": coach.bio },
      isActive: { "en-US": coach.isActive },
      joinedAt: { "en-US": coach.joinedAt },
      specialization: { "en-US": coach.specialization },
      profilePicture: { "en-US": coach.profilePicture },
      socialLinks: { "en-US": coach.socialLinks },
    });

    const entryId = entry.sys.id;

    // Store the sys.id inside final JSON (good for deletion)
    coach.sys = {
      id: entryId,
      type: "Entry",
      linkType: "Entry",
    };


    console.log(
      `   👤 [${index + 1}/${final.length}] Created Coach entry: ${coach.slug}`
    );
  }

  // Save updated final JSON
  await fs.writeFile(finalPath, JSON.stringify(final, null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  importCoaches();
}
