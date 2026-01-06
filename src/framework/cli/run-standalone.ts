import "dotenv/config";
import { fileURLToPath } from "url";
import { Migration } from "../types/migration";

/**
 * Resolve dry-run from:
 * 1. CLI flags
 * 2. DRY_RUN env
 * 3. default
 */
function resolveDryRun(): boolean {
  // 1️⃣ CLI flags take highest priority
  if (process.argv.includes("--dry-run")) return true;
  if (process.argv.includes("--no-dry-run")) return false;

  // 2️⃣ Environment variable
  if (process.env.DRY_RUN !== undefined) {
    return process.env.DRY_RUN === "true";
  }

  // 3️⃣ Safe default for standalone scripts
  return false;
}

/**
 * Detect if current file is executed directly via tsx/node
 */
function isDirectExecution(metaUrl: string): boolean {
  return process.argv[1] === fileURLToPath(metaUrl);
}

/**
 * Enables standalone execution of a migration file.
 * Handles:
 * - dotenv loading
 * - dry-run resolution
 * - error handling
 */
export function runStandaloneIfInvoked(metaUrl: string, migration: Migration) {
  if (!isDirectExecution(metaUrl)) return;

  (async () => {
    const dryRun = resolveDryRun();
    await migration.run({ dryRun });
  })().catch((err) => {
    console.error("\n❌ Standalone execution failed:", err);
    process.exit(1);
  });
}
