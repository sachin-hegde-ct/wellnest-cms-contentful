import fs from "fs/promises";

/**
 * Reads and parses a JSON file.
 * - Returns null if file does not exist
 * - Throws on invalid JSON
 */
export async function readDataFile<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch (err: any) {
    if (err.code === "ENOENT") {
      console.log(`   ⚠️  File not found, skipped: ${filePath}\n`);
      return null;
    }

    throw new Error(`Failed to read JSON file '${filePath}': ${err.message}`);
  }
}
