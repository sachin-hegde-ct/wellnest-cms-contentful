/* eslint-disable @typescript-eslint/no-explicit-any */

import { Migration } from "../../../framework/types/migration";
import { contentTypeExists } from "../../../framework/contentful/content-type-check";
import { deleteEntryById } from "../../../framework/contentful/delete-entry";
import { deleteDataFile } from "../../../framework/fs/delete-data-file";
import { TESTIMONIAL_DATA_DIR } from "../../config/data-dir";
import { CONTENT_TYPES } from "../../config/content-types";
import { readDataFile } from "../../../framework/fs/read-data-file";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const cleanupTestimonials: Migration = {
  id: "cleanup-entry-testimonials",
  kind: "cleanup",
  target: CONTENT_TYPES.TESTIMONIAL,

  async run({ dryRun }) {
    console.log("\n" + "-".repeat(60) + "\n");
    console.log(`\n🧤 Cleanup → Testimonials\n`);

    // ------------------------------------------------------
    // 1️⃣ PREFLIGHT
    // ------------------------------------------------------

    const exists = await contentTypeExists(CONTENT_TYPES.TESTIMONIAL);

    if (!exists) {
      console.log(
        `ℹ️  Content type '${CONTENT_TYPES.TESTIMONIAL}' does not exist.\n`,
      );
      console.log("\n" + "-".repeat(60) + "\n");
      return;
    }

    // ------------------------------------------------------
    // 2️⃣ LOAD STATE FILES
    // ------------------------------------------------------
    const testimonials = await readDataFile<any[]>(TESTIMONIAL_DATA_DIR.FINAL);

    if (!testimonials) {
      console.log("\n" + "-".repeat(60) + "\n");
      return;
    }

    // ------------------------------------------------------
    // 3️⃣ STREAM CLEANUP (ONE TESTIMONIAL AT A TIME)
    // ------------------------------------------------------

    const total = testimonials.length;

    for (let index = 0; index < total; index++) {
      const testimonial = testimonials[index];

      console.log(
        `\n [${index + 1}/${total}] 🧹 Removing Testimonial: ${
          testimonial.name
        }\n`,
      );

      if (testimonial?.sys?.id) {
        if (dryRun) {
          console.log(
            `   [dry-run] Would delete Testimonial ${testimonial.sys.id}`,
          );
        } else {
          await deleteEntryById(testimonial.sys.id);
        }
      }
    }

    // ------------------------------------------------------
    // 4️⃣ CLEAN LOCAL STATE
    // ------------------------------------------------------

    await deleteDataFile(TESTIMONIAL_DATA_DIR.FINAL, dryRun);
    await deleteDataFile(TESTIMONIAL_DATA_DIR.PROGRAM_MAP, dryRun);

    if (dryRun) {
      console.log(
        `\n\n🧪 Dry run summary: ${total} testimonial(s) would be deleted.\n`,
      );
    } else {
      console.log(`\n\n🎉 Cleanup completed for Testimonials.\n`);
    }

    console.log("\n" + "-".repeat(60) + "\n");
  },
};

export default cleanupTestimonials;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(cleanupTestimonials);
