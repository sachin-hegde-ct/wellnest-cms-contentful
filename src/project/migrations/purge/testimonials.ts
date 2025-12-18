import { Migration } from "../../../framework/types/migration";
import { purgeEntriesByContentType } from "../../../framework/contentful/purge-entries";
import {
  resolveDryRun,
  isDirectExecution,
} from "../../../framework/cli/standalone";
import { confirmPurge } from "../../../framework/cli/confirm-purge";
import { CONTENT_TYPES } from "../../config/content-types";

const purgeTestimonials: Migration = {
  id: "purge-entry-testimonials",
  kind: "purge",
  target: "testimonials",

  async run({ dryRun }) {
    await confirmPurge("Testimonials", dryRun);

    console.log(
      `\n---------------------------------------------------------\n\n` +
        `🔥 Purge → Testimonials\n`
    );

    await purgeEntriesByContentType(CONTENT_TYPES.TESTIMONIAL, dryRun);

    console.log(
      `\n🎉 Purge completed for Testimonials.\n` +
        `\n---------------------------------------------------------\n`
    );
  },
};

export default purgeTestimonials;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */

async function runStandalone() {
  await import("dotenv/config");
  const dryRun = resolveDryRun();
  await purgeTestimonials.run({ dryRun });
}

if (isDirectExecution(import.meta.url)) {
  runStandalone().catch((err) => {
    console.error("\n❌ Standalone execution failed:", err);
    process.exit(1);
  });
}
