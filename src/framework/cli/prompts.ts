import { select, confirm } from "@inquirer/prompts";
import { Migration } from "../types/migration";

export async function askOperation(migrations: Migration[]): Promise<string> {
  const kinds = [...new Set(migrations.map((m) => m.kind))];

  return select({
    message: "Select operation",
    choices: kinds.map((k) => ({
      name: formatKind(k),
      value: k,
    })),
    loop: true,
    pageSize: 10,
  });
}

export async function askTarget(
  migrations: Migration[],
  kind: string
): Promise<string> {
  const targets = migrations
    .filter((m) => m.kind === kind)
    .map((m) => m.target);

  return select({
    message: "Select target",
    choices: targets.map((t) => ({
      name: t,
      value: t,
    })),
    loop: true,
    pageSize: 10
  });
}

export async function askDryRun(): Promise<boolean> {
  return confirm({
    message: "Run in dry-run mode?",
    default: true,
  });
}

function formatKind(kind: string) {
  switch (kind) {
    case 'migrate': return "🪄  Migrate Everything";
    case 'create': return "🧱 Create Content Type";
    case 'import': return "🚀 Import Entries";
    case 'cleanup': return "🧤 Cleanup Imported Entries";
    case 'delete': return "🗑️  Delete Content Type";
    case 'purge': return "🔥 Purge entries (dangerous)";
  };
}
