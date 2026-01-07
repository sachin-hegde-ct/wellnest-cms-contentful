import { Migration } from "../../../framework/types/migration";
import importCoaches from "./coaches";
import importPrograms from "./programs";
import importArticles from "./articles";
import importTestimonials from "./testimonials";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const IMPORT_ORDER = [
  importCoaches,
  importPrograms,
  importArticles,
  importTestimonials,
];

const importAllEntries: Migration = {
  id: "import-entry-all",
  kind: "import",
  target: "all",

  async run({ dryRun }) {
    console.log("\n" + "=".repeat(60) + "\n");
    console.log(`\n🚀 IMPORT ALL ENTRIES\n`);

    for (const migration of IMPORT_ORDER) {
      await migration.run({ dryRun });
    }

    console.log(dryRun ? "" : `\n\n🎉 All entries imported successfully.\n`);
    console.log("\n" + "=".repeat(60) + "\n");
  },
};

export default importAllEntries;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(importAllEntries);
