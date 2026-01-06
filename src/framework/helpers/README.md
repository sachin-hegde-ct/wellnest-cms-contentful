# Framework - Helpers
This folder contains **small, focused helper utilities** that improve safety, readability, and observability of migration executions. These helpers are framework-level and reusable across all migration types

## Folder structure
```
src/framework/helpers/
│
├─ error.ts
├─ print-dry-run.ts
├─ print-info-table.ts
```

### `error.ts`
Common error helpers, including detection of Contentful “not found” errors.

### `print-dry-run.ts`
Prints detailed previews for dry-run create and delete content-type operations, including schema and affected entries.

### `print-info-table.ts`
Renders formatted console tables for displaying environment and execution metadata.
