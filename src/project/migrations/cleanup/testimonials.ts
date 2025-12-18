import fs from "fs/promises";
import { Migration } from "../../../framework/types/migration";
import { deleteEntryById } from "../../../framework/contentful/delete-entry";
import { TESTIMONIAL_DATA_DIR } from "../../config/data-dir";
import {
  resolveDryRun,
  isDirectExecution,
} from "../../../framework/cli/standalone";

const cleanupTestimonials: Migration = {
  id: "cleanup-entry-testimonials",
  kind: "cleanup",
  target: "testimonials",

  async run({ dryRun }) {
    console.log(
      `\n---------------------------------------------------------\n\n` +
        `🧤 Cleanup → Testimonials\n`
    );

    const { FINAL, PROGRAM_MAP } = TESTIMONIAL_DATA_DIR;

    let testimonials: any[] = [];

    // ---------- Load testimonial file ----------
    try {
      testimonials = JSON.parse(await fs.readFile(FINAL, "utf8"));
    } catch {
      console.log(
        `⚠️  No file found: ${FINAL}. Skipping testimonial cleanup\n` +
          `\n---------------------------------------------------------\n`
      );
      return;
    }

    // ---------- Delete testimonial entries ----------
    for (const [index, testimonial] of testimonials.entries()) {
      const name = testimonial?.name ?? "Unknown";
      const entryId = testimonial?.sys?.id;

      console.log(`  [${index + 1}/${testimonials.length}] 🧹 ${name}`);

      if (!entryId) {
        console.log(`      ⚠️  Missing entry id, skipped\n`);
        continue;
      }

      if (dryRun) {
        console.log(`      [dry-run] Would delete entry ${entryId}\n`);
        continue;
      }

      await deleteEntryById(entryId);
    }

    // ---------- Delete local JSON files ----------
    await safeDelete(FINAL, dryRun);
    await safeDelete(PROGRAM_MAP, dryRun);

    console.log(
      `\n\n🎉 Cleanup completed for Testimonials.\n` +
        `\n---------------------------------------------------------\n`
    );
  },
};

export default cleanupTestimonials;

/* ------------------------------------------------------------------ */

async function safeDelete(filePath: string, dryRun: boolean) {
  if (dryRun) {
    console.log(`  [dry-run] Would delete file: ${filePath}`);
    return;
  }

  try {
    await fs.unlink(filePath);
    console.log(`\n  🗑️  Deleted file: ${filePath}`);
  } catch (err: any) {
    if (err.code === "ENOENT") {
      console.log(`  ⚠️  File not found, skipped: ${filePath}\n`);
    } else {
      console.log(`  ❌ Failed to delete ${filePath}: ${err.message}\n`);
    }
  }
}

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */

async function runStandalone() {
  await import("dotenv/config");
  const dryRun = resolveDryRun();
  await cleanupTestimonials.run({ dryRun });
}

if (isDirectExecution(import.meta.url)) {
  runStandalone().catch((err) => {
    console.error("\n❌ Standalone execution failed:", err);
    process.exit(1);
  });
}
