import type {
  ContentTypeField,
  ContentTypeSchema,
} from "../../framework/types/content-type";
import { URL_PATTERN } from "../config/regex";
import { CONTENT_TYPES } from "../config/content-types";

const socialLinksFields: ContentTypeField[] = [
  {
    id: "title",
    name: "Title",
    type: "Symbol",
    required: true,
    editor: "singleLine",
  },
  {
    id: "instagram",
    name: "Instagram",
    type: "Symbol",
    validations: [
      {
        regexp: {
          pattern: URL_PATTERN,
        },
      },
    ],
    editor: "singleLine",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    type: "Symbol",
    validations: [
      {
        regexp: {
          pattern: URL_PATTERN,
        },
      },
    ],
    editor: "singleLine",
  },
  {
    id: "website",
    name: "Website",
    type: "Symbol",
    validations: [
      {
        regexp: {
          pattern: URL_PATTERN,
        },
      },
    ],
    editor: "singleLine",
  },
];

export const socialLinksSchema: ContentTypeSchema = {
  id: CONTENT_TYPES.SOCIAL_LINKS,
  name: "Social Links",
  displayField: "title",
  fields: socialLinksFields,
};
