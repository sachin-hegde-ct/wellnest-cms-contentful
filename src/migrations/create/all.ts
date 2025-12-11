import { createContentType } from "../../scripts/create-content-type";
import { CONTENT_TYPES } from "../../constants/content-types";

import { imageWrapperContentTypeMigration } from "./image-wrapper";
import { socialLinksContentTypeMigration } from "./social-links";
import { coachContentTypeMigration } from "./coach";

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
  { id: CONTENT_TYPES.COACH, migrationFn: coachContentTypeMigration },
];

export const runCreateAll = async () => {
  console.log(`\n========== 🏗️  CREATE ALL CONTENT TYPES ==========\n`);

  for (const entry of CREATE_IN_ORDER) {
    await createContentType(entry.id, entry.migrationFn);
  }

  console.log(`\n🎉 All content types created successfully.\n`);
  console.log(`============================================================\n`);
};

// Auto-run only when executed directly from terminal
if (import.meta.url === `file://${process.argv[1]}`) {
  runCreateAll();
}
