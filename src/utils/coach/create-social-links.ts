import fs from "fs/promises";
import { createEntry } from "../../scripts/create-entry";
import { COACH_DATA_DIR } from "../../constants/data-dir";
import { CONTENT_TYPES } from "../../constants/content-types";

export async function createSocialLinksForCoaches() {
  const final = JSON.parse(await fs.readFile(COACH_DATA_DIR.FINAL, "utf8"));
  const socialMap: Record<string, any> = {};

  for (const [index, coach] of final.entries()) {
    const s = coach.socialLinks;

    const entry = await createEntry(CONTENT_TYPES.SOCIAL_LINKS, {
      title: { "en-US": `Social Links: ${coach.name}` },
      instagram: { "en-US": s.instagram || "" },
      linkedin: { "en-US": s.linkedin || "" },
      website: { "en-US": s.website || "" },
    });

    socialMap[coach.slug] = entry.sys.id;

    coach.socialLinks = {
      sys: {
        type: "Link",
        linkType: "Entry",
        id: entry.sys.id,
      },
    };

    console.log(
      `   🔗 [${index + 1}/${final.length}] Created SocialLinks for ${
        coach.name
      }`
    );
  }

  await fs.writeFile(
    COACH_DATA_DIR.SOCIAL_LINKS_MAP,
    JSON.stringify(socialMap, null, 2)
  );
  await fs.writeFile(COACH_DATA_DIR.FINAL, JSON.stringify(final, null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  createSocialLinksForCoaches();
}
