import { Migration } from "../../../framework/types/migration";
import { contentTypeExists } from "../../../framework/contentful/content-type-check";
import { purgeEntriesByContentType } from "../../../framework/contentful/purge-entries";
import { confirm } from "@inquirer/prompts";
import { CONTENT_TYPES } from "../../config/content-types";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const purgeArticles: Migration = {
  id: "purge-entry-articles",
  kind: "purge",
  target: "articles",

  async run({ dryRun }) {
    console.log("\n" + "-".repeat(60) + "\n");
    console.log(`\n🔥 PURGE → Articles (DESTRUCTIVE)\n`);

    // ------------------------------------------------------------------
    // 1️⃣ PREFLIGHT CHECK
    // ------------------------------------------------------------------

    const exists = await contentTypeExists(CONTENT_TYPES.ARTICLE);

    if (!exists) {
      console.log(`ℹ️  Content type '${CONTENT_TYPES.ARTICLE}' does not exist. 👉 Nothing to purge.`);
      return;
    }

    // ------------------------------------------------------------------
    // 2️⃣ CONFIRMATION
    // ------------------------------------------------------------------

    if (!dryRun) {
      const confirmed = await confirm({
        message: "This will PERMANENTLY delete ALL Article entries. Continue?",
        default: false,
      });

      if (!confirmed) {
        console.log(`   ❌ Purge aborted by user.\n`);
        return;
      }
    }

    // ------------------------------------------------------------------
    // 3️⃣ PURGE
    // ------------------------------------------------------------------

    await purgeEntriesByContentType(CONTENT_TYPES.ARTICLE, dryRun);

    console.log(dryRun ? "" : `\n🔥 All Article entries purged successfully.\n`);
    console.log("\n" + "-".repeat(60) + "\n");
  },
};

export default purgeArticles;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, purgeArticles);
