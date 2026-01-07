import "../env";

import { ExitPromptError } from "@inquirer/core";
import { migrations } from "../../project/registry";
import { askOperation, askTarget, askDryRun } from "./prompts";
import { runMigration } from "../core/runner";
import { getEnvironmentInfo } from "../contentful/environment";
import { enforceProdSafety } from "./prod-safety";
import { printInfoTable } from "../helpers/print-info-table";

async function main() {
  const envInfo = await getEnvironmentInfo();

  printInfoTable("Contentful Target", [
    { label: "Space", value: envInfo.spaceId },
    { label: "Environment", value: envInfo.environment },
  ]);

  const kind = await askOperation(migrations);
  const target = kind == "migrate" ? "all" : await askTarget(migrations, kind);
  const dryRun = await askDryRun();

  await enforceProdSafety(envInfo.environment, kind, dryRun);

  const migration = migrations.find(
    (m: { kind: string; target?: string }) =>
      m.kind === kind && m.target === target,
  );

  if (!migration) {
    throw new Error("Migration not found");
  }

  await runMigration(migration, { dryRun });
}

main().catch((err) => {
  if (err instanceof ExitPromptError) {
    console.log("\n👋 Operation cancelled by user.\n");
    process.exit(0);
  }

  console.error("\n❌ Unexpected error:", err);
  process.exit(1);
});
