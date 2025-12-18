export type MigrationKind =
  | "migrate"
  | "create"
  | "delete"
  | "import"
  | "cleanup"
  | "purge";

export interface MigrationContext {
  dryRun: boolean;
}

export interface Migration {
  id: string;
  kind: MigrationKind;
  target: string;

  run(ctx: MigrationContext): Promise<void>;
}
