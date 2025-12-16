import { createContentType } from "../../scripts/create-content-type";
import { CONTENT_TYPES } from "../../constants/content-types";

import { imageWrapperContentTypeMigration } from "./image-wrapper";
import { socialLinksContentTypeMigration } from "./social-links";
import { coachContentTypeMigration } from "./coach";
import { articleContentTypeMigration } from "./article";
import { programSessionContentTypeMigration } from "./program-session";
import { programContentTypeMigration } from "./program";
import { testimonialContentTypeMigration } from "./testimonial";

const CREATE_IN_ORDER: Array<{
  id: string;
  migrationFn: Parameters<typeof createContentType>[1];
}> = [
  {
    id: CONTENT_TYPES.IMAGE_WRAPPER,
    migrationFn: imageWrapperContentTypeMigration,
  },
  {
    id: CONTENT_TYPES.SOCIAL_LINKS,
    migrationFn: socialLinksContentTypeMigration,
  },
  {
    id: CONTENT_TYPES.PROGRAM_SESSION,
    migrationFn: programSessionContentTypeMigration,
  },
  { id: CONTENT_TYPES.COACH, migrationFn: coachContentTypeMigration },
  { id: CONTENT_TYPES.ARTICLE, migrationFn: articleContentTypeMigration },
  { id: CONTENT_TYPES.PROGRAM, migrationFn: programContentTypeMigration },
  { id: CONTENT_TYPES.TESTIMONIAL, migrationFn: testimonialContentTypeMigration },
];

export const runCreateAll = async () => {
  console.log(`\n=============== 🖋️  CREATE ALL CONTENT TYPES ===============\n`);

  for (const entry of CREATE_IN_ORDER) {
    await createContentType(entry.id, entry.migrationFn);
  }

  console.log(`\n🎉 All content types created successfully`);
  console.log(`\n=============================================================\n`);
};

// Auto-run only when executed directly from terminal
if (import.meta.url === `file://${process.argv[1]}`) {
  runCreateAll();
}
