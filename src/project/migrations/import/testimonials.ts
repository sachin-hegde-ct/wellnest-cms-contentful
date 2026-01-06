import { Migration } from "../../../framework/types/migration";
import { contentTypeExists } from "../../../framework/contentful/content-type-check";
import { CONTENT_TYPES } from "../../config/content-types";

import { importTestimonials } from "../../utils/testimonials/import";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const importTestimonialsMigration: Migration = {
  id: "import-entry-testimonials",
  kind: "import",
  target: CONTENT_TYPES.TESTIMONIAL,

  async run({ dryRun }) {
    console.log("\n" + "-".repeat(60) + "\n");
    console.log(`\n🚀 Import → Testimonials\n`);

    const exists = await contentTypeExists(CONTENT_TYPES.TESTIMONIAL);

    if (!exists) {
      console.log(
        `ℹ️  Content type '${CONTENT_TYPES.TESTIMONIAL}' does not exist.\n`
      );
      return;
    }

    if (dryRun) {
      console.log(`   [dry-run] Would import testimonial entries\n`);
    }

    await importTestimonials({ dryRun });

    console.log("\n" + "-".repeat(60) + "\n");
  },
};

export default importTestimonialsMigration;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, importTestimonialsMigration);
