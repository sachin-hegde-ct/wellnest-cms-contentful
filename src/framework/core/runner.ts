import { Migration, MigrationContext } from "../types/migration";

export async function runMigration(
  migration: Migration,
  ctx: MigrationContext
) {
  if (ctx.dryRun) {
    console.log("[dry-run] No changes will be made");
    return;
  }

    await migration.run(ctx);
}
