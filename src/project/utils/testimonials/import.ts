import fs from "fs/promises";
import { TESTIMONIAL_DATA_DIR } from "../../config/data-dir";

import { assignRandomProgram } from "./assign-program";
import { createTestimonialEntry } from "./create-entry";
import { readDataFile } from "../../../framework/fs/read-data-file";
import { writeDataFile } from "../../../framework/fs/write-data-file";

export async function importTestimonials({ dryRun }: { dryRun: boolean }) {
  const sourceTestimonials = await readDataFile<any[]>(
    TESTIMONIAL_DATA_DIR.SOURCE
  );

  if (!sourceTestimonials || sourceTestimonials.length === 0) {
    console.log(
      `\n⚠️  No source testimonials found at ${TESTIMONIAL_DATA_DIR.SOURCE}\n`
    );
    return;
  }

  const finalTestimonials: any[] = [];
  const programMap: Record<string, any> = {};

  for (let index = 0; index < sourceTestimonials.length; index++) {
    const testimonial = sourceTestimonials[index];
    const key = testimonial.name;

    console.log(
      `\n   💬 [${index + 1}/${sourceTestimonials.length}] ${testimonial.name}`
    );

    /* -------------------------------------------------
     * 1. Assign program
     * ------------------------------------------------- */
    let program: any = null;

    if (!dryRun) {
      program = await assignRandomProgram();
      programMap[key] = {
        programId: program.programId,
      };
    }

    /* -------------------------------------------------
     * 2. Create testimonial entry
     * ------------------------------------------------- */
    let entryId: string | null = null;

    if (dryRun) {
      console.log(
        `      💬 [DRY RUN] Would create Testimonial entry linked to program`
      );
    } else {
      entryId = await createTestimonialEntry(testimonial, program.programLink);

      testimonial.sys = {
        id: entryId,
        type: "Entry",
        linkType: "Entry",
      };

      finalTestimonials.push(testimonial);
    }

    /* -------------------------------------------------
     * 3. Persist state
     * ------------------------------------------------- */
    await writeDataFile(TESTIMONIAL_DATA_DIR.FINAL, finalTestimonials, { dryRun });
    await writeDataFile(TESTIMONIAL_DATA_DIR.PROGRAM_MAP, programMap, { dryRun });

    console.log(
      dryRun
        ? `   🟡 Dry run completed for testimonial`
        : `   ✅ Testimonial imported`
    );
  }

  console.log(
    dryRun
      ? `\n🧪 Dry run completed. No data was written.\n`
      : `\n🎉 All testimonials imported successfully.\n`
  );
}
