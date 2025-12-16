import fs from "fs/promises";
import { deleteEntryById } from "../../scripts/delete-entry";
import { TESTIMONIAL_DATA_DIR } from "../../constants/data-dir";

export const cleanupTestimonials = async () => {
  console.log(
    `\n---------------------------------------------------------\n\n` +
      `🧤 Operation: Cleanup, Entry: Testimonial\n`
  );

  const finalJsonPath = TESTIMONIAL_DATA_DIR.FINAL;
  const programMapPath = TESTIMONIAL_DATA_DIR.PROGRAM_MAP;

  let finalTestimonials: any[] = [];
  let programMap: Record<string, any> = {};

  // ---------- Load files (safe) ----------
  try {
    finalTestimonials = JSON.parse(await fs.readFile(finalJsonPath, "utf8"));
  } catch {
    console.log(`   ⚠️  No ${finalJsonPath} found. Skipping entry cleanup.\n`);
  }

  try {
    programMap = JSON.parse(await fs.readFile(programMapPath, "utf8"));
  } catch {
    console.log(
      `   ⚠️  No ${programMapPath} found. Skipping program map cleanup.\n`
    );
  }

  // ---------- Delete all testimonial entries ----------
  for (const [index, testimonial] of finalTestimonials.entries()) {
    console.log(
      `\n [${index + 1}/${finalTestimonials.length}] 🧹 Removing Testimonial: ${
        testimonial.name
      }\n`
    );

    const testimonialEntryId = testimonial?.sys?.id;

    // 1. Delete the testimonial entry
    if (testimonialEntryId) {
      await deleteEntryById(testimonialEntryId);
    }

    // 2. Do NOT delete related program — programs are reused
  }

  // ---------- Delete JSON files ----------
  async function safeDelete(filePath: string) {
    try {
      await fs.unlink(filePath);
    } catch (err: any) {
      if (err.code === "ENOENT") {
        console.log(`   ⚠️  File not found, skipping: ${filePath}`);
      } else {
        console.log(`   ❌ Could not delete ${filePath}: ${err.message}`);
      }
    }
  }

  await safeDelete(finalJsonPath);
  await safeDelete(programMapPath);

  console.log(
    `\n\n🎉 Testimonial entries cleaned up successfully.\n` +
      `\n---------------------------------------------------------\n`
  );
};

// Auto-run when executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  cleanupTestimonials();
}
