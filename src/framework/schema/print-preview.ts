import { ContentTypePreview, FieldPreview } from "./schema-types";

function renderValidations(field: FieldPreview): string {
  if (!field.validations?.length) return "—";

  return field.validations.filter((v) => v.kind !== "richText")
    .map((v) => {
      switch (v.kind) {
        case "minLength":
          return `minLength: ${v.value}`;
        case "maxLength":
          return `maxLength: ${v.value}`;
        case "range":
          return `range: ${v.min ?? "?"} to ${v.max ?? "?"}`;
        case "enum":
          return `oneOf: ${v.values.join(", ")}`;
        case "regex":
          return `pattern: ${v.description}`;
      }
    })
    .join(" | ");
}

function renderNotes(field: FieldPreview): string {
  const notes: string[] = [];

  if (field.defaultValue !== undefined) {
    notes.push(`default: ${JSON.stringify(field.defaultValue)}`);
  }

  if (field.link) {
    notes.push(
      `link → ${field.link.target}${
        field.link.contentTypes
          ? ` (${field.link.contentTypes.join(", ")})`
          : ""
      }`
    );
  }

  if (field.items) {
    notes.push(
      `array of ${field.items.itemType}${
        field.items.link?.contentTypes
          ? ` (${field.items.link.contentTypes.join(", ")})`
          : ""
      }`
    );
  }

  if (field.ui) {
    field.ui.filter((u) => u.kind !== "entryCard").forEach((u) => {
      if (u.kind === "slug") notes.push(`slug from "${u.from}"`);
      if (u.kind === "multiline") notes.push("multiline input");
    });
  }

  return notes.length ? notes.join(" | ") : "—";
}

export function printContentTypePreview(type: ContentTypePreview, options ={
  validationSpacer: 40
}) {
  const adjustedSpacer = Math.max(options.validationSpacer, 40);
  console.log(`   ${"-".repeat(70 + adjustedSpacer)}`);
  console.log(`    ${"Field".padEnd(18)} ${"Type".padEnd(14)} ${"Required".padEnd(10)} ${"Validations".padEnd(options.validationSpacer)} ${"Notes"}`);
  console.log(`   ${"-".repeat(70 + adjustedSpacer)}`);

  type.fields.forEach((f) => {
    console.log(`    ${f.label.padEnd(18)} ${f.type.padEnd(14)} ${(f.required ? "Yes" : "No").padEnd(10)} ${renderValidations(f).padEnd(options.validationSpacer)} ${renderNotes(f)}`);
  });

  console.log(`   ${"-".repeat(70 + adjustedSpacer)}\n`);
}
