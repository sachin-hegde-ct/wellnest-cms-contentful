import {
  ContentTypeField,
  ContentTypeSchema,
} from "../../framework/types/content-type";
import { CONTENT_TYPES } from "../config/content-types";

const testimonialFields: ContentTypeField[] = [
  {
    id: "name",
    name: "Name",
    type: "Symbol",
    required: true,
    validations: [
      {
        size: { min: 5 },
        message:
          "Name looks short - try using at least 5 characters for better clarity",
      },
    ],
    editor: "singleLine",
  },
  {
    id: "quote",
    name: "Quote",
    type: "Text",
    required: true,
    validations: [
      {
        size: { min: 20 },
        message:
          "Quote looks short - try using at least 20 characters for better clarity",
      },
    ],
    editor: "multipleLine",
  },
  {
    id: "rating",
    name: "Rating",
    type: "Symbol",
    required: true,
    validations: [
      {
        in: ["1", "2", "3", "4", "5"],
      },
    ],
    editor: "singleLine",
  },
  {
    id: "isApproved",
    name: "Is Approved",
    type: "Boolean",
    defaultValue: {
      "en-US": false,
    },
    editor: "boolean",
  },
  {
    id: "date",
    name: "Date",
    type: "Date",
    required: true,
    editor: "datePicker",
  },
  {
    id: "relatedProgram",
    name: "Related Program",
    type: "Link",
    linkType: "Entry",
    required: true,
    validations: [
      {
        linkContentType: ["program"],
      },
    ],
    editor: "entryCardEditor",
  },
];

export const testimonialSchema: ContentTypeSchema = {
  id: CONTENT_TYPES.TESTIMONIAL,
  name: "Testimonial",
  displayField: "name",
  fields: testimonialFields,
};
