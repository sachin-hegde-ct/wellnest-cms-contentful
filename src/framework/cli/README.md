# Framework - CLI

The `cli` module provides the interactive command-line interface for the CMS migration framework. It is responsible for guiding users through available migration operations, collecting execution parameters, and enforcing safety checks before any migration logic is executed.

This layer focuses purely on **user interaction and execution orchestration**. All business logic and Contentful operations are delegated to the framework core.

## Folder Structure
```
src/framework/cli/
│
├─ confirm-purge.ts
├─ index.ts
├─ prod-safety.ts
├─ prompts.ts
├─ run-standalone.ts

```

### `confirm-purge.ts`
Implements an explicit confirmation guard for **highly destructive purge operations**.

Before permanently deleting entries, the CLI requires clear user consent to prevent accidental data loss.<br/> 
When running in `dry-run` mode, this confirmation step is intentionally skipped to allow safe inspection of purge behavior.

### `index.ts`
Acts as the primary **CLI entry point** for the migration framework.

This file initializes environment configuration, displays the resolved Contentful target (space and environment), prompts the user to select an operation, target, and dry-run mode, and then resolves and executes the selected migration using the framework runner. It also handles graceful exits and centralized error reporting.

### `prod-safety.ts`
Enforces **production environment safety guarantees**.

When a destructive action is executed against a production Contentful environment, this module introduces an additional confirmation step to prevent irreversible mistakes. Dry-run executions are always allowed on production, enabling safe validation without modifying live data.

### `prompts.ts`
Defines all interactive **CLI prompts** used by the migration system.

Available operations and targets are dynamically derived from the migration registry, ensuring the CLI remains accurate and up to date as migrations evolve. Centralizing prompt logic keeps the interface consistent, discoverable, and easy to extend.

### `run-standalone.ts`
Provides utilities for **non-interactive and standalone execution** of migration scripts.

It loads environment variables, resolves execution context (such as dry-run mode) from CLI flags or environment variables, and detects whether a migration file is being executed directly. This allows migration scripts to run correctly both when invoked via the CLI and when executed independently.