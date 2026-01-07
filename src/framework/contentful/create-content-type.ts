import { buildField, FIELD_EDITORS } from "../schema/build-field";
import { ContentTypeSchema } from "../types/content-type";
import { contentTypeExists } from "./content-type-check";
import { getContentfulContext } from "./environment";

export async function createContentType(schema: ContentTypeSchema) {
  console.log("\n" + "-".repeat(60) + "\n");
  console.log(`\n🧱 Create → Content Type: ${schema.id}\n`);

  const { contentfulEnvironment } = await getContentfulContext();

  // ------------------------------------------------------------------
  // 1. CHECK IF CONTENT TYPE EXISTS
  // ------------------------------------------------------------------

  const exists = await contentTypeExists(schema.id);

  if (exists) {
    console.log(
      `ℹ️  Content type '${schema.id}' already exists. Skipping create.\n`
    );
    console.log("\n" + "-".repeat(60) + "\n");
    return;
  }

  console.log(`\n    ⏳ Creating schema '${schema.id}'…\n`);

  /* ---------- Create content type ---------- */
  const contentType = await contentfulEnvironment.createContentTypeWithId(
    schema.id,
    {
      name: schema.name,
      description: schema.description,
      displayField: schema.displayField,
      fields: schema.fields.map(buildField),
    }
  );

  await contentType.publish();

  /* ---------- Apply editor UI ---------- */
  const editorInterfaces = await contentfulEnvironment.getEditorInterfaces();

  const editorInterface = editorInterfaces.items.find(
    (ei) => ei.sys.contentType.sys.id === contentType.sys.id
  );

  if (!editorInterface) {
    throw new Error(
      `EditorInterface not found for content type "${contentType.sys.id}"`
    );
  }

  editorInterface.controls = editorInterface.controls ?? [];

  for (const field of schema.fields) {
    if (!field.editor) continue;

    const editor = FIELD_EDITORS[field.editor];

    const existing = editorInterface.controls.find(
      (c) => c.fieldId === field.id
    );

    if (existing) {
      existing.widgetId = editor.widgetId;
      existing.settings = editor.settings;
    } else {
      editorInterface.controls.push({
        fieldId: field.id,
        widgetId: editor.widgetId,
        settings: editor.settings,
      });
    }
  }

  await editorInterface.update();

  console.log(`\n🎉 Content type '${schema.id}' created successfully.\n`);
  console.log("\n" + "-".repeat(60) + "\n");
}
