# Framework - Core

This folder contains the **core execution and safety primitives** used by the migration framework.<br/>
It defines how migrations are executed and how destructive operations are guarded, independent of CLI or Contentful specifics.

## Folder structure

```
src/framework/core/
│
├─ prod-guard.ts
├─ runner.ts
```

### `prod-guard.ts`

Identifies production environments and flags destructive migration actions to enable additional safety checks.

### `runner.ts`

Executes a resolved migration with a shared execution context, including dry-run handling.
