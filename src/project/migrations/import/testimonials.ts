import { Migration } from "../../../framework/types/migration";
import {
  resolveDryRun,
  isDirectExecution,
} from "../../../framework/cli/standalone";
import { contentTypeExists } from "../../../framework/contentful/content-type";
import { assignProgramsToTestimonials } from "../../utils/testimonials/assign-programs";
import { importTestimonialEntries } from "../../utils/testimonials/import-entries";
import { CONTENT_TYPES } from "../../config/content-types";

const importTestimonials: Migration = {
  id: "import-entry-testimonials",
  kind: "import",
  target: "testimonials",

  async run({ dryRun }) {
    console.log(
      `\n---------------------------------------------------------\n\n` +
        `🚀 Import → Testimonials\n`
    );

    // ------------------------------------------------------------------
    // 1️⃣ PRE-FLIGHT CHECK
    // ------------------------------------------------------------------

    const exists = await contentTypeExists(CONTENT_TYPES.TESTIMONIAL);

    if (!exists) {
      console.log(
        `\nℹ️  Content type '${CONTENT_TYPES.TESTIMONIAL}' does not exist.\n` +
          `👉 Please create the content type before importing entries.\n` +
          `\n---------------------------------------------------------\n`
      );
      return;
    }

    if (dryRun) {
      console.log(
        `   [dry-run] Would assign programs and import testimonials\n`
      );
      return;
    }

    // ------------------------------------------------------------------
    // 2️⃣ ASSIGN PROGRAMS
    // ------------------------------------------------------------------

    try {
      console.log(`\n 🔹 Assigning Programs to testimonials...\n`);
      await assignProgramsToTestimonials();
      console.log(`\n   ✅ Assigning Programs COMPLETED.\n`);
    } catch (err) {
      console.error(`❌ Assigning Programs FAILED: ${(err as Error).message}`);
      process.exit(1);
    }

    // ------------------------------------------------------------------
    // 3️⃣ CREATE ENTRIES
    // ------------------------------------------------------------------

    try {
      console.log(`\n 🔹 Creating Testimonial entries...\n`);
      await importTestimonialEntries();
      console.log(`\n   ✅ Creating Testimonial entries COMPLETED.\n`);
    } catch (err) {
      console.error(
        `❌ Creating Testimonial entries FAILED: ${(err as Error).message}`
      );
      process.exit(1);
    }

    console.log(
      `\n🎉 Testimonial entries imported successfully.\n` +
        `\n---------------------------------------------------------\n`
    );
  },
};

export default importTestimonials;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */

async function runStandalone() {
  await import("dotenv/config");
  const dryRun = resolveDryRun();
  await importTestimonials.run({ dryRun });
}

if (isDirectExecution(import.meta.url)) {
  runStandalone().catch((err) => {
    console.error("\n❌ Standalone execution failed:", err);
    process.exit(1);
  });
}
