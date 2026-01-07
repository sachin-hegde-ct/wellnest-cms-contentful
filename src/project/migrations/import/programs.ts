import { Migration } from "../../../framework/types/migration";
import { contentTypeExists } from "../../../framework/contentful/content-type-check";
import { CONTENT_TYPES } from "../../config/content-types";

import { importPrograms } from "../../utils/programs/import";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const importProgramsMigration: Migration = {
  id: "import-entry-programs",
  kind: "import",
  target: CONTENT_TYPES.PROGRAM,

  async run({ dryRun }) {
    console.log("\n" + "-".repeat(60) + "\n");
    console.log(`\n🚀 Import → Programs\n`);

    const exists = await contentTypeExists(CONTENT_TYPES.PROGRAM);

    if (!exists) {
      console.log(
        `   ℹ️  Content type '${CONTENT_TYPES.PROGRAM}' does not exist.\n`,
      );
      return;
    }

    if (dryRun) {
      console.log(`   [dry-run] Would import program entries\n`);
    }

    await importPrograms({ dryRun });

    console.log("\n" + "-".repeat(60) + "\n");
  },
};

export default importProgramsMigration;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(importProgramsMigration);
