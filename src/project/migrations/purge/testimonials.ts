import { Migration } from "../../../framework/types/migration";
import { purgeEntriesByContentType } from "../../../framework/contentful/purge-entries";
import { confirmPurge } from "../../../framework/cli/confirm-purge";
import { CONTENT_TYPES } from "../../config/content-types";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const purgeTestimonials: Migration = {
  id: "purge-entry-testimonials",
  kind: "purge",
  target: "testimonials",

  async run({ dryRun }) {
    await confirmPurge("Testimonials", dryRun);

    console.log("\n" + "-".repeat(60) + "\n");
    console.log(`\n🔥 Purge → Testimonials\n`);

    await purgeEntriesByContentType(CONTENT_TYPES.TESTIMONIAL, dryRun);

    console.log(dryRun ? `` : `\n🔥 Purge completed for Testimonials.\n`);
    console.log("\n" + "-".repeat(60) + "\n");
  },
};

export default purgeTestimonials;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(purgeTestimonials);
