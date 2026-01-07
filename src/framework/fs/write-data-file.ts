import fs from "fs/promises";

/**
 * Writes JSON data to disk.
 * - Pretty-prints by default
 * - Supports dry-run
 */
export async function writeDataFile(
  filePath: string,
  data: unknown,
  { dryRun = false, indent = 2 }: { dryRun?: boolean; indent?: number } = {},
) {
  if (dryRun) {
    console.log(`        💾 [DRY RUN] Would update: ${filePath}\n`);
    return;
  }

  await fs.writeFile(filePath, JSON.stringify(data, null, indent));
}
