import type {
  ContentTypeField,
  ContentTypeSchema,
} from "../../framework/types/content-type";
import { CONTENT_TYPES } from "../config/content-types";
import { RICH_TEXT_EDITOR_SETTINGS } from "../config/rich-text-editor";

const articleFields: ContentTypeField[] = [
  {
    id: "title",
    name: "Title",
    type: "Symbol",
    required: true,
    validations: [
      {
        size: {
          min: 5,
        },
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
    id: "content",
    name: "Content",
    type: "RichText",
    required: true,
    validations: [
      {
        size: {
          min: 100,
        },
        message:
          "Content looks short - try using at least 100 characters for better clarity",
      },
      ...RICH_TEXT_EDITOR_SETTINGS,
    ],
    editor: "richTextEditor",
  },
  {
    id: "category",
    name: "Category",
    type: "Symbol",
    required: true,
    validations: [
      {
        in: ["Nutrition", "Mindfulness", "Fitness", "Sleep"],
      },
    ],
    editor: "singleLine",
  },
  {
    id: "isPublished",
    name: "Is Published",
    type: "Boolean",
    defaultValue: {
      "en-US": false,
    },
    editor: "boolean",
  },
  {
    id: "publishDate",
    name: "Publish Date",
    type: "Date",
    editor: "datePicker",
  },
  {
    id: "coverImage",
    name: "Cover Image",
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
    id: "readingTime",
    name: "Reading Time",
    type: "Integer",
    defaultValue: {
      "en-US": 1,
    },
    validations: [
      {
        range: {
          min: 1,
          max: 60,
        },
      },
    ],
  },
  {
    id: "author",
    name: "Author",
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
    id: "tags",
    name: "Tags",
    type: "Array",
    items: {
      type: "Symbol",
    },
  },
];

export const articleSchema: ContentTypeSchema = {
  id: CONTENT_TYPES.ARTICLE,
  name: "Article",
  displayField: "title",
  fields: articleFields,
};
