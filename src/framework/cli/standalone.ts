import { fileURLToPath } from "url";

/**
 * Resolve dry-run from:
 * 1. CLI flags
 * 2. DRY_RUN env
 * 3. default
 */
export function resolveDryRun(): boolean {
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
export function isDirectExecution(metaUrl: string): boolean {
  return process.argv[1] === fileURLToPath(metaUrl);
}