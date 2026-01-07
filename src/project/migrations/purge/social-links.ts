import { Migration } from "../../../framework/types/migration";
import { contentTypeExists } from "../../../framework/contentful/content-type-check";
import { purgeEntriesByContentType } from "../../../framework/contentful/purge-entries";
import { confirm } from "@inquirer/prompts";
import { CONTENT_TYPES } from "../../config/content-types";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const purgeSocialLinks: Migration = {
  id: "purge-entry-social-links",
  kind: "purge",
  target: CONTENT_TYPES.SOCIAL_LINKS,

  async run({ dryRun }) {
    console.log("\n" + "-".repeat(60) + "\n");
    console.log(`\n🔥 PURGE → Social Links\n`);

    const exists = await contentTypeExists(CONTENT_TYPES.SOCIAL_LINKS);

    if (!exists) {
      console.log(
        `   ℹ️  Content type '${CONTENT_TYPES.SOCIAL_LINKS}' does not exist.\n`,
      );
      return;
    }

    if (!dryRun) {
      const confirmed = await confirm({
        message:
          "This will PERMANENTLY delete ALL Social Links entries. Continue?",
        default: false,
      });

      if (!confirmed) {
        console.log(`   ❌ Purge aborted.\n`);
        return;
      }
    }

    await purgeEntriesByContentType(CONTENT_TYPES.SOCIAL_LINKS, dryRun);

    console.log(
      dryRun ? "" : `\n🔥 All Social Links entries purged successfully.\n`,
    );
    console.log("\n" + "-".repeat(60) + "\n");
  },
};

export default purgeSocialLinks;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(purgeSocialLinks);
