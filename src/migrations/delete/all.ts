import { deleteContentType } from "../../utils/delete-content-type";

/**
 * Defines the order of deletion.
 * Independent content types must be deleted first,
 * followed by types that reference them.
 */
const CONTENT_TYPES_TO_DELETE = ["imageWrapper", "socialLinks", "coach"];

const run = async () => {
  console.log(
    `\n========== 🗑️  DELETE ALL CONTENT TYPES ==========\n`
  );

  for (const type of CONTENT_TYPES_TO_DELETE) {
    try {
      await deleteContentType(type);
    } catch (err) {
      console.log(
        `❌ Unexpected failure deleting '${type}'. Aborting delete-all.\n`
      );
      process.exit(1);
    }
  }

  console.log(`\n🎉 All content types deleted successfully.\n`);
  console.log(`============================================================\n`);
};

run();
