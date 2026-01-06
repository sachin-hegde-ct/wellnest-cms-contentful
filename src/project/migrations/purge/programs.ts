import { Migration } from "../../../framework/types/migration";
import { contentTypeExists } from "../../../framework/contentful/content-type-check";
import { purgeEntriesByContentType } from "../../../framework/contentful/purge-entries";
import { confirm } from "@inquirer/prompts";
import { CONTENT_TYPES } from "../../config/content-types";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const purgePrograms: Migration = {
  id: "purge-entry-programs",
  kind: "purge",
  target: CONTENT_TYPES.PROGRAM,

  async run({ dryRun }) {
    console.log("\n" + "-".repeat(60) + "\n");
    console.log(`\n🔥 PURGE → Programs\n`);

    const exists = await contentTypeExists(CONTENT_TYPES.PROGRAM);

    if (!exists) {
      console.log(
        `   ℹ️  Content type '${CONTENT_TYPES.PROGRAM}' does not exist.\n`
      );
      return;
    }

    if (!dryRun) {
      const confirmed = await confirm({
        message: "This will PERMANENTLY delete ALL Program entries. Continue?",
        default: false,
      });

      if (!confirmed) {
        console.log(`   ❌ Purge aborted.\n`);
        return;
      }
    }

    await purgeEntriesByContentType(CONTENT_TYPES.PROGRAM, dryRun);

    console.log(
      dryRun ? "" : `\n🔥 All Program entries purged successfully.\n`
    );
    console.log("\n" + "-".repeat(60) + "\n");
  },
};

export default purgePrograms;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, purgePrograms);
