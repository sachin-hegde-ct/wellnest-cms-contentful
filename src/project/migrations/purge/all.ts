import { Migration } from "../../../framework/types/migration";

// Individual purge migrations
import purgeTestimonials from "./testimonials";
import purgeArticles from "./articles";
import purgeProgramSessions from "./program-sessions";
import purgePrograms from "./programs";
import purgeCoaches from "./coaches";
import purgeSocialLinks from "./social-links";
import purgeImageWrappers from "./image-wrapper";
import purgeAssets from "./assets";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const PURGE_ORDER = [
  purgeTestimonials,
  purgeArticles,
  purgeProgramSessions,
  purgePrograms,
  purgeCoaches,
  purgeSocialLinks,
  purgeImageWrappers,
  purgeAssets,
];

const purgeAllEntries: Migration = {
  id: "purge-entry-all",
  kind: "purge",
  target: "all",

  async run({ dryRun }) {
    console.log("\n" + "=".repeat(60) + "\n");
    console.log(`\n🔥 PURGE ALL ENTRIES\n`);

    for (const migration of PURGE_ORDER) {
      await migration.run({ dryRun });
    }

    console.log(
      dryRun
        ? `\n🧪 Dry run completed. No data was written.\n`
        : `\n🔥 All entries purged successfully.\n`,
    );
    console.log("\n" + "=".repeat(60) + "\n");
  },
};

export default purgeAllEntries;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(purgeAllEntries);
