## Folder structure

The project folder contains **Project-specific CMS migration logic** built on top of the reusable framework layer. All business rules, content structure decisions, and data workflows live here, while execution and safety concerns are handled by the framework.

```
src/project/
│
├─ config/
│
├─ migrations/
│  ├─ create/
│  ├─ delete/
│  ├─ import/
│  ├─ cleanup/
│  ├─ purge/
│  ├─ all.ts
│
├─ schema/
│
├─ registry.ts
```

### `config/`

Holds **project-level configuration and constants** used across migrations, such as content type IDs, field names, data paths, and shared migration settings.

### `migrations/`

Contains all **executable migration scripts**, grouped by intent to ensure clarity and safety.

#### Subfolders

- `create/` – Content type creation migrations

- `delete/` – Content type deletion migrations

- `import/` – Data import migrations (JSON / NDJSON → Contentful)

- `cleanup/` – Rollback imported entries and assets

- `purge/` – Bulk deletion of all entries for a content type

- `all.ts` – Orchestrated migration that resets and recreates the entire CMS state

Each migration is isolated, explicit, and safe to re-run.

### `schema/`

Exports **project-specific schema definitions** used when creating Contentful content types. These schema helpers are consumed by create migrations and dry-run previews to ensure consistency between intent and execution.

### `registry.ts`

Acts as the central migration registry.

This file imports and registers all migration definitions so the CLI can:

- Discover available actions

- Present them as selectable operations

- Execute the correct migration based on user input

## Migration File Contract

Every migration file must export a single Migration object with the following structure:

```
export interface Migration {
  id: string;
  kind: MigrationKind;
  target: string;

  run(ctx: MigrationContext): Promise<void>;
}
```

Example

```
const createArticleContentType: Migration = {
  id: "create-content-type-article",
  kind: "create",
  target: "article",

  async run({ dryRun }) {
    // migration logic goes here
  },
};

export default createArticleContentType;
```
