import { confirm } from "@inquirer/prompts";

/**
 * Ask for explicit confirmation before destructive purge.
 * Dry-run never requires confirmation.
 */
export async function confirmPurge(
  label: string,
  dryRun: boolean,
): Promise<void> {
  if (dryRun) return;

  const confirmed = await confirm({
    message: `🚨 This will PERMANENTLY delete ALL ${label}. Continue?`,
    default: false,
  });

  if (!confirmed) {
    console.log("\n❌ Purge aborted by user.\n");
    process.exit(1);
  }
}
