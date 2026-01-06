import { ContentTypePreview } from "../../../framework/schema/schema-types";

export const socialLinksPreview: ContentTypePreview = {
  id: "socialLinks",
  displayField: "title",
  fields: [
    {
      id: "title",
      label: "Title",
      type: "Symbol",
      required: true,
    },
    {
      id: "instagram",
      label: "Instagram",
      type: "Symbol",
      required: false,
      validations: [{ kind: "regex", description: "URL_PATTERN" }],
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      type: "Symbol",
      required: false,
      validations: [{ kind: "regex", description: "URL_PATTERN" }],
    },
    {
      id: "website",
      label: "Website",
      type: "Symbol",
      required: false,
      validations: [{ kind: "regex", description: "URL_PATTERN" }],
    },
  ],
};
