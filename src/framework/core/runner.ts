import { Migration, MigrationContext } from "../types/migration";

export async function runMigration(
  migration: Migration,
  ctx: MigrationContext
) {
  if (ctx.dryRun) {
    console.log("\n[dry-run] No changes will be made\n");
  }

  await migration.run(ctx);
}
