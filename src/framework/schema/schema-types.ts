export type Validation =
  | { kind: "minLength"; value: number }
  | { kind: "maxLength"; value: number }
  | { kind: "range"; min?: number; max?: number }
  | { kind: "enum"; values: string[] }
  | { kind: "regex"; description: string }
  | { kind: "richText"; description: string };

export type LinkConstraint = {
  target: "Entry" | "Asset";
  contentTypes?: string[];
};

export type ArrayConstraint = {
  itemType: string;
  link?: LinkConstraint;
};

export type UIHint =
  | { kind: "slug"; from: string }
  | { kind: "multiline" }
  | { kind: "entryCard" };

export type FieldPreview = {
  id: string;
  label: string;
  type: string;
  required: boolean;

  validations?: Validation[];
  defaultValue?: unknown;

  link?: LinkConstraint;
  items?: ArrayConstraint;
  ui?: UIHint[];
};

export type ContentTypePreview = {
  id: string;
  displayField: string;
  fields: FieldPreview[];
};
