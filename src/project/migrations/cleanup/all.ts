import { Migration } from "../../../framework/types/migration";
import cleanupTestimonials from "./testimonials";
import cleanupArticles from "./articles";
import cleanupPrograms from "./programs";
import cleanupCoaches from "./coaches";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const CLEANUP_ORDER = [
  cleanupTestimonials,
  cleanupArticles,
  cleanupPrograms,
  cleanupCoaches,
];

const cleanupAllEntries: Migration = {
  id: "cleanup-entry-all",
  kind: "cleanup",
  target: "all",

  async run({ dryRun }) {
    console.log("\n" + "=".repeat(60) + "\n");
    console.log(`\n🧤 CLEANUP ALL ENTRIES\n`);

    for (const migration of CLEANUP_ORDER) {
      await migration.run({ dryRun });
    }

    console.log(dryRun ? "" : `\n\n🎉 All entries cleaned up successfully.\n`);
    console.log("\n" + "=".repeat(60) + "\n");
  },
};

export default cleanupAllEntries;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(cleanupAllEntries);
