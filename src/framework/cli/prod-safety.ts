import { confirm } from "@inquirer/prompts";
import { isProdEnvironment, isDestructiveAction } from "../core/prod-guard";

export async function enforceProdSafety(
  environment: string,
  action: string,
  dryRun: boolean,
) {
  if (!isProdEnvironment(environment)) return;

  // Always allow dry-run on prod
  if (dryRun) {
    console.log("⚠️  Running in DRY-RUN mode on production.");
    return;
  }

  if (!isDestructiveAction(action)) return;

  console.log("\n🚨 PRODUCTION SAFETY CHECK 🚨\n");

  const confirmed = await confirm({
    message:
      `You are about to run a DESTRUCTIVE action (${action}) ` +
      `on PRODUCTION (${environment}). Continue?`,
    default: false,
  });

  if (!confirmed) {
    console.log("❌ Aborted by production safety guard.\n");
    process.exit(1);
  }
}
