import { Migration } from "../../../framework/types/migration";
import { contentTypeExists } from "../../../framework/contentful/content-type-check";
import { purgeEntriesByContentType } from "../../../framework/contentful/purge-entries";
import { confirm } from "@inquirer/prompts";
import { CONTENT_TYPES } from "../../config/content-types";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const purgeCoaches: Migration = {
  id: "purge-entry-coaches",
  kind: "purge",
  target: CONTENT_TYPES.COACH,

  async run({ dryRun }) {
    console.log("\n" + "-".repeat(60) + "\n");
    console.log(`\n🔥 PURGE → Coaches\n`);

    const exists = await contentTypeExists(CONTENT_TYPES.COACH);

    if (!exists) {
      console.log(
        `   ℹ️  Content type '${CONTENT_TYPES.COACH}' does not exist.\n`,
      );
      return;
    }

    if (!dryRun) {
      const confirmed = await confirm({
        message: "This will PERMANENTLY delete ALL Coach entries. Continue?",
        default: false,
      });

      if (!confirmed) {
        console.log(`   ❌ Purge aborted.\n`);
        return;
      }
    }

    await purgeEntriesByContentType(CONTENT_TYPES.COACH, dryRun);

    console.log(dryRun ? "" : `\n🔥 All Coach entries purged successfully.\n`);
    console.log("\n" + "-".repeat(60) + "\n");
  },
};

export default purgeCoaches;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(purgeCoaches);
