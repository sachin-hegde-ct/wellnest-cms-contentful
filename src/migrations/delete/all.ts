import { deleteImageWrapperContentType } from "./image-wrapper";
import { deleteSocialLinksContentType } from "./social-links";
import { deleteCoachContentType } from "./coach";

/**
 * Order matters:
 * Delete dependent types AFTER independent ones
 */
const DELETE_IN_ORDER = [
  deleteImageWrapperContentType,
  deleteSocialLinksContentType,
  deleteCoachContentType,
];

export const runDeleteAll = async () => {
  console.log(`\n========== 🗑️  DELETE ALL CONTENT TYPES ==========\n`);

  for (const fn of DELETE_IN_ORDER) {
    await fn();
  }

  console.log(`\n🎉 All content types deleted successfully.\n`);
  console.log(`============================================================\n`);
};

// Auto-run only when called directly from terminal
if (import.meta.url === `file://${process.argv[1]}`) {
  runDeleteAll();
}
