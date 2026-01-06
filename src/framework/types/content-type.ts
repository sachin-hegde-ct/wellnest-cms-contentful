export type FieldType =
  | "Symbol"
  | "Text"
  | "RichText"
  | "Integer"
  | "Number"
  | "Boolean"
  | "Date"
  | "Link"
  | "Array";

export type LinkType = "Entry" | "Asset";

export type FieldEditor =
  | "singleLine"
  | "multipleLine"
  | "slugEditor"
  | "entryCardEditor"
  | "assetLinkEditor"
  | "boolean"
  | "datePicker"
  | "richTextEditor";

export interface ContentTypeField {
  id: string;
  name: string;
  type: FieldType;

  required?: boolean;
  localized?: boolean;
  disabled?: boolean;
  omitted?: boolean;

  validations?: any[];
  defaultValue?: Record<string, any>;

  linkType?: LinkType;
  items?: {
    type: FieldType;
    linkType?: LinkType;
  };

  editor?: FieldEditor;
}

export interface ContentTypeSchema {
  id: string;
  name: string;
  description?: string;
  displayField: string;
  fields: ContentTypeField[];
}
