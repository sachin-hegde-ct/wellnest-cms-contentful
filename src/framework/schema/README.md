## Framework - Schema
This folder contains **schema-level abstractions and rendering utilities** used to describe and preview Contentful content types, primarily for dry-run and validation output.

## Folder structure
```
src/framework/schema/
│
├─ print-preview.ts
├─ schema-types.ts
```

### `schema-types.ts`
Defines framework-level TypeScript types that describe Contentful content type structure, field metadata, validations, and UI hints in a simplified, migration-friendly format.

### `print-preview.ts`
Renders a readable console preview of a content type schema, including fields, validations, defaults, links, and UI notes, used primarily during dry-run execution.