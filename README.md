# Contentful Migration Framework

This repository provides a **structured, safe, and repeatable migration framework** for managing Contentful schemas, entries, and assets.<br/>
It is designed to separate generic migration infrastructure from project-specific CMS logic, enabling predictable and auditable content operations across environments.

## Core Concepts

1. Framework vs Project

   The migration system is split into two clear layers:
   - **Framework** – Reusable, project-agnostic building blocks for Contentful operations and CLI execution

   - **Project** – Project-specific migration logic defining what to migrate and how

   This separation ensures:
   - Safety and consistency across environments
   - Easy onboarding for new contributors
   - Reusability of migration infrastructure across projects

2. Working Model (How Migrations Flow)

   Migrations follow a clear, intentional lifecycle:

   ```
   create   → define content types (schema)
   import   → populate entries and upload assets
   cleanup  → delete imported entries and their associated assets
   purge    → remove all entries of a content type (global reset)
   delete   → remove content type schema itself
   ```

   Each step is isolated, explicit, and dry-run aware.

## Folder Structure

This repository is structured to clearly separate reusable migration infrastructure from project-specific CMS logic.

The `framework` directory contains generic, reusable code for Contentful interactions and CLI tooling, including environment setup, client initialization, and shared migration utilities.

The `project` directory defines project-specific migration workflows that consume the framework’s Contentful abstractions to perform content type management and data migrations.

The `data` directory serves as the source of truth for migration inputs, holding structured JSON / NDJSON files used to seed and manage Contentful content.

```
cms-migration/
│
├─ src/
│  ├─ framework/                # Reusable migration infrastructure
│  │  ├─ cli/                   # Interactive CLI & safety prompts
│  │  ├─ contentful/            # Contentful Management API helpers
│  │  ├─ core/                  # Migration execution & prod guards
│  │  ├─ fs/                    # File-system helpers (read/write/delete)
│  │  ├─ helpers/               # Logging, dry-run previews, utilities
│  │  ├─ schema/                # Schema preview & validation abstractions
│  │  ├─ types/                 # Shared TypeScript contracts
│  │  ├─ env.ts                 # Environment resolution & validation
│
│  ├─ project/                  # Project-specific CMS logic
│  │  ├─ config/                # Constants and configuration
│  │  ├─ migrations/            # All executable migrations
│  │  │  ├─ create/             # Create content types
│  │  │  ├─ delete/             # Delete content types
│  │  │  ├─ import/             # Import entries & assets
│  │  │  ├─ cleanup/            # Delete imported entries & assets
│  │  │  ├─ purge/              # Purge all entries of a content type
│  │  │  ├─ all.ts              # Full CMS reset & rebuild
│  │  ├─ schema/                # Project CMS schema definitions
│  │  ├─ registry.ts            # Central migration registry
│
├─ data/                        # Source-of-truth datasets (JSON / NDJSON)
│
├─ .env                         # Local environment variables
├─ .env.example                 # Environment variable template
├─ package.json
└─ tsconfig.json
```

## Running Migrations

Migrations can be executed in two ways:

1. Direct command execution for targeted actions
2. Interactive CLI mode for guided execution

Both approaches use the same underlying framework and safety guarantees.

### 1. Running Targeted Commands

All available migration commands are defined in `package.json` and can be executed directly using `npm run`.

Each command performs a **single, explicit action**, making it ideal for automation or repeatable workflows.

```
npm run create:content-type:article
```

Creates the Article content type in Contentful (skips if it already exists).

Other examples include:

```
npm run import:entry:articles
npm run cleanup:entry:articles
npm run purge:entry:articles
npm run delete:content-type:article
```

### 2. Running Interactive CLI Mode

For guided execution, run:

```
npm run migrate
```

This launches an interactive CLI that walks you through the migration process step by step.

#### Step 1: Select Operation

You will be prompted to choose the type of operation:

```
🪄  Migrate Everything
🧱  Create Content Type
🚀  Import Entries
🧤  Cleanup Imported Entries
🗑️   Delete Content Type
🔥  Purge entries (dangerous)
```

#### Step 2: Select Target

Based on the selected operation, the CLI will prompt you to select a target content type or entry type, such as:

```
article
coach
program
testimonial
```

Available targets are derived from the migration registry, ensuring the CLI always reflects the actual migrations present in the project.

#### Step 3: Dry-Run Selection

You will be asked whether to run the migration in dry-run mode:

```
Run in dry-run mode? (Yes/No)
```

- Yes → No data is written; the CLI shows what would happen
- No → The migration is executed for real

Dry-run mode is strongly recommended for:

- First-time execution
- Production environments
- Destructive operations
