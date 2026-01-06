import { Migration } from "../../../framework/types/migration";
import { confirm } from "@inquirer/prompts";
import { purgeAllAssets } from "../../../framework/contentful/purge-assets";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const purgeAssets: Migration = {
  id: "purge-assets",
  kind: "purge",
  target: "assets",

  async run({ dryRun }) {
    console.log("\n" + "-".repeat(60) + "\n");
    console.log(`\n🔥 PURGE → ALL ASSETS\n`);

    if (!dryRun) {
      const confirmed = await confirm({
        message:
          "This will PERMANENTLY delete ALL assets. This cannot be undone. Continue?",
        default: false,
      });

      if (!confirmed) {
        console.log(`   ❌ Asset purge aborted.\n`);
        return;
      }
    }

    await purgeAllAssets(dryRun);

    console.log(dryRun ? "" : `\n🔥 All Assets purged successfully.\n`);
    console.log("\n" + "-".repeat(60) + "\n");
  },
};

export default purgeAssets;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, purgeAssets);
