import { runCleanupAll } from "./cleanup/all";
import { runCreateAll } from "./create/all";
import { runDeleteAll } from "./delete/all";
import { runImportAll } from "./import/all";

export const runMigrateAll = async () => {
    await runCleanupAll();

    await runDeleteAll();

    await runCreateAll();

    await runImportAll();
};

// Auto-run only when executed directly from terminal
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrateAll();
}
