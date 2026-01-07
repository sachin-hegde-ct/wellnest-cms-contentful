import { ContentTypeField, ContentTypeSchema } from "../types/content-type";

/* -------------------------------------------------
 * Render helpers
 * ------------------------------------------------- */
function renderValidations(field: ContentTypeField): string {
  if (!field.validations?.length) return "—";

  return field.validations
    .map((v) => {
      if ("size" in v) {
        if (v.size?.min && v.size?.max)
          return `length: ${v.size.min}-${v.size.max}`;
        if (v.size?.min) return `minLength: ${v.size.min}`;
        if (v.size?.max) return `maxLength: ${v.size.max}`;
      }

      if ("in" in v) {
        return `oneOf: ${v.in.join(", ")}`;
      }

      if ("unique" in v) {
        return `unique`;
      }

      if ("linkContentType" in v) {
        return `linkType: ${v.linkContentType.join(", ")}`;
      }

      return "custom";
    })
    .join(" | ");
}

function renderNotes(field: ContentTypeField): string {
  const notes: string[] = [];

  if (field.defaultValue !== undefined) {
    notes.push(`default: ${JSON.stringify(field.defaultValue)}`);
  }

  if (field.type === "Link") {
    notes.push(
      `link → ${field.linkType}${
        field.validations?.some((v) => "linkContentType" in v)
          ? ` (${field.validations
              .filter((v) => "linkContentType" in v)
              .flatMap((v) => v.linkContentType)
              .join(", ")})`
          : ""
      }`,
    );
  }

  if (field.type === "Array" && field.items) {
    notes.push(
      `array of ${field.items.type}${
        field.items.linkType ? ` (${field.items.linkType})` : ""
      }`,
    );
  }

  if (field.editor) {
    if (field.editor === "slugEditor") notes.push(`slug editor`);
    if (field.editor === "multipleLine") notes.push(`multiline input`);
    if (field.editor === "entryCardEditor") notes.push(`entry card`);
  }

  return notes.length ? notes.join(" | ") : "—";
}

/* -------------------------------------------------
 * Print schema table
 * ------------------------------------------------- */
export function printContentTypePreview(
  schema: ContentTypeSchema,
  options: { validationSpacer?: number } = {},
) {
  const spacer = Math.max(options.validationSpacer ?? 40, 40);

  console.log(`\n   ${"-".repeat(70 + spacer)}`);
  console.log(
    `    ${"Field".padEnd(18)} ${"Type".padEnd(14)} ${"Required".padEnd(
      10,
    )} ${"Validations".padEnd(spacer)} Notes`,
  );
  console.log(`   ${"-".repeat(70 + spacer)}`);

  schema.fields.forEach((f) => {
    console.log(
      `    ${f.name.padEnd(18)} ${f.type.padEnd(14)} ${(f.required
        ? "Yes"
        : "No"
      ).padEnd(10)} ${renderValidations(f).padEnd(spacer)} ${renderNotes(f)}`,
    );
  });

  console.log(`   ${"-".repeat(70 + spacer)}\n`);
}
