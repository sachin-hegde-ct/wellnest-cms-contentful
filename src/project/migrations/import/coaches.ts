import { Migration } from "../../../framework/types/migration";
import { contentTypeExists } from "../../../framework/contentful/content-type-check";
import { CONTENT_TYPES } from "../../config/content-types";

import { importCoaches } from "../../utils/coaches/import";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const importCoachesMigration: Migration = {
  id: "import-entry-coaches",
  kind: "import",
  target: CONTENT_TYPES.COACH,

  async run({ dryRun }) {
    console.log("\n" + "-".repeat(60) + "\n");
    console.log(`\n🚀 Import → Coaches\n`);

    const exists = await contentTypeExists(CONTENT_TYPES.COACH);

    if (!exists) {
      console.log(
        `ℹ️  Content type '${CONTENT_TYPES.COACH}' does not exist.\n`,
      );
      return;
    }

    if (dryRun) {
      console.log(`   [dry-run] Would import coach entries\n`);
    }

    await importCoaches({ dryRun });

    console.log("\n" + "-".repeat(60) + "\n");
  },
};

export default importCoachesMigration;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(importCoachesMigration);
