import fs from "fs/promises";

/**
 * Deletes a file if it exists.
 * - Skips silently if file is missing
 * - Supports dry-run
 */
export async function deleteDataFile(filePath: string, dryRun: boolean) {
  if (dryRun) {
    console.log(`\n[dry-run] Would delete file: ${filePath}`);
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
