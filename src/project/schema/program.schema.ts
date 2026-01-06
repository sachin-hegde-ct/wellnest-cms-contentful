import {
  ContentTypeField,
  ContentTypeSchema,
} from "../../framework/types/content-type";
import { CONTENT_TYPES } from "../config/content-types";
import { RICH_TEXT_EDITOR_SETTINGS } from "../config/rich-text-editor";

const programFields: ContentTypeField[] = [
  {
    id: "title",
    name: "Title",
    type: "Symbol",
    required: true,
    validations: [
      {
        size: { min: 5 },
        message:
          "Title looks short - try using at least 5 characters for better clarity",
      },
    ],
    editor: "singleLine",
  },
  {
    id: "slug",
    name: "Slug",
    type: "Symbol",
    required: true,
    editor: "slugEditor",
  },
  {
    id: "summary",
    name: "Summary",
    type: "Text",
    required: true,
    validations: [
      {
        size: { min: 30 },
        message:
          "Summary looks short - try using at least 30 characters for better clarity",
      },
    ],
    editor: "multipleLine",
  },
  {
    id: "description",
    name: "Description",
    type: "RichText",
    required: true,
    validations: [
      {
        size: { min: 100 },
        message:
          "Content looks short - try using at least 100 characters for better clarity",
      },
      ...RICH_TEXT_EDITOR_SETTINGS,
    ],
    editor: "richTextEditor",
  },
  {
    id: "difficultyLevel",
    name: "Difficulty Level",
    type: "Symbol",
    required: true,
    validations: [
      {
        in: ["Beginner", "Intermediate", "Advanced"],
      },
    ],
    editor: "singleLine",
  },
  {
    id: "durationWeeks",
    name: "Duration Weeks",
    type: "Integer",
    defaultValue: { "en-US": 1 },
    validations: [
      {
        range: {
          min: 1,
          max: 52,
        },
      },
    ],
  },
  {
    id: "isFeatured",
    name: "Is Featured",
    type: "Boolean",
    defaultValue: { "en-US": false },
    editor: "boolean",
  },
  {
    id: "startDate",
    name: "Start Date",
    type: "Date",
    required: true,
    editor: "datePicker",
  },
  {
    id: "bannerImage",
    name: "Banner Image",
    type: "Link",
    linkType: "Entry",
    required: true,
    validations: [
      {
        linkContentType: ["imageWrapper"],
      },
    ],
    editor: "entryCardEditor",
  },
  {
    id: "coach",
    name: "Coach",
    type: "Link",
    linkType: "Entry",
    required: true,
    validations: [
      {
        linkContentType: ["coach"],
      },
    ],
    editor: "entryCardEditor",
  },
  {
    id: "sessions",
    name: "Sessions",
    type: "Array",
    required: true,
    items: {
      type: "Link",
      linkType: "Entry",
    },
    validations: [
      {
        linkContentType: ["programSession"],
      },
    ],
  },
];

export const programSchema: ContentTypeSchema = {
  id: CONTENT_TYPES.PROGRAM,
  name: "Program",
  displayField: "title",
  fields: programFields,
};
