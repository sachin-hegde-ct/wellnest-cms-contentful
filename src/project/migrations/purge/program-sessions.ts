import { Migration } from "../../../framework/types/migration";
import { contentTypeExists } from "../../../framework/contentful/content-type-check";
import { purgeEntriesByContentType } from "../../../framework/contentful/purge-entries";
import { confirm } from "@inquirer/prompts";
import { CONTENT_TYPES } from "../../config/content-types";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const purgeProgramSessions: Migration = {
  id: "purge-entry-program-sessions",
  kind: "purge",
  target: CONTENT_TYPES.PROGRAM_SESSION,

  async run({ dryRun }) {
    console.log("\n" + "-".repeat(60) + "\n");
    console.log(`\n🔥 PURGE → Program Sessions\n`);

    const exists = await contentTypeExists(CONTENT_TYPES.PROGRAM_SESSION);

    if (!exists) {
      console.log(
        `   ℹ️  Content type '${CONTENT_TYPES.PROGRAM_SESSION}' does not exist.\n`,
      );
      return;
    }

    if (!dryRun) {
      const confirmed = await confirm({
        message:
          "This will PERMANENTLY delete ALL Program Session entries. Continue?",
        default: false,
      });

      if (!confirmed) {
        console.log(`   ❌ Purge aborted.\n`);
        return;
      }
    }

    await purgeEntriesByContentType(CONTENT_TYPES.PROGRAM_SESSION, dryRun);

    console.log(
      dryRun ? "" : `\n🔥 All Program Session entries purged successfully.\n`,
    );
    console.log("\n" + "-".repeat(60) + "\n");
  },
};

export default purgeProgramSessions;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(purgeProgramSessions);
