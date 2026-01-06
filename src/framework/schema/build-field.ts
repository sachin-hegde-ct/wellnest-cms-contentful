import type { ContentTypeProps } from "contentful-management";
import { ContentTypeField, FieldEditor } from "../types/content-type";

type SDKField = ContentTypeProps["fields"][number];

export const FIELD_EDITORS: Record<
  FieldEditor,
  { widgetId: string; settings?: Record<string, any> }
> = {
  singleLine: { widgetId: "singleLine" },
  multipleLine: { widgetId: "multipleLine" },
  slugEditor: {
    widgetId: "slugEditor",
    settings: { trackingFieldId: "title" },
  },
  entryCardEditor: { widgetId: "entryCardEditor" },
  assetLinkEditor: { widgetId: "assetLinkEditor" },
  boolean: { widgetId: "boolean" },
  datePicker: { widgetId: "datePicker" },
  richTextEditor: { widgetId: "richTextEditor" },
};

export function buildField(field: ContentTypeField): SDKField {
  if (field.type === "Link" && !field.linkType) {
    throw new Error(`Link field "${field.id}" requires linkType`);
  }

  if (field.type === "Array" && !field.items) {
    throw new Error(`Array field "${field.id}" requires items`);
  }

  return {
    id: field.id,
    name: field.name,
    type: field.type,

    required: field.required ?? false,
    localized: field.localized ?? false,
    disabled: field.disabled ?? false,
    omitted: field.omitted ?? false,

    validations: field.validations ?? [],
    defaultValue: field.defaultValue,

    linkType: field.linkType,
    items: field.items,
  };
}
