import { contentTypeExists } from "../contentful/content-type-check";
import { getEntries } from "../contentful/get-entries";
import { printContentTypePreview } from "../schema/print-preview";
import { ContentTypeSchema } from "../types/content-type";

export async function printDryRunCreateContentType(
  schema: ContentTypeSchema,
  { validationSpacer = 50 }: { validationSpacer?: number } = {},
) {
  console.log("\n" + "-".repeat(60) + "\n");
  console.log(`\n🧱 Create → Content Type: ${schema.id}\n`);

  const exists = await contentTypeExists(schema.id);

  if (exists) {
    console.log(
      `ℹ️  Content type '${schema.id}' already exists. Skipping create.\n`,
    );
    console.log("\n" + "-".repeat(60) + "\n");
    return;
  }

  console.log(`  Would create content type '${schema.id}'`);
  console.log(`  Name           : ${schema.name}`);
  console.log(`  Display field  : ${schema.displayField}`);
  if (schema.description) {
    console.log(`  Description    : ${schema.description}`);
  }

  printContentTypePreview(schema, { validationSpacer });

  console.log(`\n🧪 Dry run completed. No data was written.\n`);
  console.log("\n" + "-".repeat(60) + "\n");
}

export async function printDryRunDeleteContentType(
  schema: ContentTypeSchema,
  { validationSpacer = 50 }: { validationSpacer?: number } = {},
) {
  console.log("\n" + "-".repeat(60) + "\n");
  console.log(`\n🗑️  Delete → Content Type: ${schema.id}\n`);

  const exists = await contentTypeExists(schema.id);

  if (!exists) {
    console.log(
      `\nℹ️  Content type '${schema.id}' does not exist. Skipping delete.\n`,
    );
    console.log("\n" + "-".repeat(60) + "\n");
    return;
  }

  const entries = await getEntries({
    content_type: schema.id,
    limit: 1000,
  });
  const count = entries.items.length;

  if (count > 0) {
    console.log(`    ⚠️  Found ${count} entr${count === 1 ? "y" : "ies"}.\n`);
  }

  for (const entry of entries.items) {
    console.log(`        Would delete entry ${entry.sys.id}`);
  }

  console.log(`\n\n   Would delete schema '${schema.id}'\n`);
  printContentTypePreview(schema, { validationSpacer });

  console.log(`\n🧪 Dry run completed. No data was written.\n`);
  console.log("\n" + "-".repeat(60) + "\n");

  return;
}
