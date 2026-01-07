# Framework - Contentful

This folder contains **low-level, reusable Contentful management operations** used across all migrations.
All logic here is **Contentful-specific but project-agnostic**, making it safe to reuse across environments and migration types

## Folder Structure

```
src/framework/contentful/
│
├─ content-type-check.ts
├─ create-content-type.ts
├─ create-entry.ts
├─ delete-asset.ts
├─ delete-content-type.ts
├─ delete-entry.ts
├─ unpublish-entry.ts
├─ environment.ts
├─ get-entries.ts
├─ purge-assets.ts
├─ purge-entries.ts
├─ upload-asset.ts
```

### `environment.ts`

Initializes and caches Contentful client, space, and environment.

### `content-type-check.ts`

Checks existence and state of Contentful content types.

### `create-content-type.ts`

Creates Contentful content types safely and idempotently using the Contentful Management API, based on a strongly-typed `ContentTypeSchema`.

### `delete-content-type.ts`

Deletes a content type after removing its entries.

### `create-entry.ts`

Creates and publishes a Contentful entry.

### `unpublish-entry.ts`

Unpublishes an entry if it is currently published.

### `delete-entry.ts`

Safely unpublishes (if needed) and deletes an entry by ID.

### `get-entries.ts`

Fetches entries for a given content type.

### `purge-entries.ts`

Purges all entries of a specific content type (dry-run safe).

### `delete-asset.ts`

Safely deletes an asset by ID.

### `purge-assets.ts`

Purges all assets in the environment (dry-run safe).

### `upload-asset.ts`

Uploads, processes, and publishes assets.
