import { contentTypeExists } from "../contentful/content-type-check";
import { getContentfulContext } from "../contentful/environment";
import { getEntries } from "../contentful/get-entries";
import { printContentTypePreview } from "../schema/print-preview";
import { ContentTypePreview } from "../schema/schema-types";

export async function printDryRunCreateContentType(
  contentTypeId: string,
  contentTypePreview: ContentTypePreview,
  { validationSpacer = 50 }: { validationSpacer?: number } = {}
) {
  console.log("\n" + "-".repeat(60) + "\n");
  console.log(`\n🧱 Create → Content Type: ${contentTypeId}\n`);

  const exists = await contentTypeExists(contentTypeId);

  if (exists) {
    console.log(
      `ℹ️  Content type '${contentTypeId}' already exists. Skipping create.\n`
    );
    console.log("\n" + "-".repeat(60) + "\n");
    return;
  }

  console.log(`  Would create content type '${contentTypeId}'\n`);
  printContentTypePreview(contentTypePreview, { validationSpacer });

  console.log(`\n🧪 Dry run completed. No data was written.\n`);
  console.log("\n" + "-".repeat(60) + "\n");

  return;
}

export async function printDryRunDeleteContentType(
  contentTypeId: string,
  contentTypePreview: ContentTypePreview,
  { validationSpacer = 50 }: { validationSpacer?: number } = {}
) {
  const { contentfulEnvironment } = await getContentfulContext();

  console.log("\n" + "-".repeat(60) + "\n");
  console.log(`\n🗑️  Delete → Content Type: ${contentTypeId}\n`);

  const exists = await contentTypeExists(contentTypeId);

  if (!exists) {
    console.log(
      `\nℹ️  Content type '${contentTypeId}' does not exist. Skipping delete.\n`
    );
    console.log("\n" + "-".repeat(60) + "\n");
    return;
  }

  const entries = await getEntries({
    content_type: contentTypeId,
    limit: 1000,
  });
  const count = entries.items.length;

  if (count > 0) {
    console.log(`    ⚠️  Found ${count} entr${count === 1 ? "y" : "ies"}.\n`);
  }

  for (const entry of entries.items) {
    console.log(`        Would delete entry ${entry.sys.id}`);
  }

  console.log(`\n\n   Would delete schema '${contentTypeId}'\n`);
  printContentTypePreview(contentTypePreview, { validationSpacer });

  console.log(`\n🧪 Dry run completed. No data was written.\n`);
  console.log("\n" + "-".repeat(60) + "\n");

  return;
}
