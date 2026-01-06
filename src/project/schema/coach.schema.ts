import type {
  ContentTypeField,
  ContentTypeSchema,
} from "../../framework/types/content-type";
import { CONTENT_TYPES } from "../config/content-types";
import { RICH_TEXT_EDITOR_SETTINGS } from "../config/rich-text-editor";

const coachFields: ContentTypeField[] = [
  {
    id: "name",
    name: "Name",
    type: "Symbol",
    required: true,
    validations: [
      {
        size: {
          min: 3,
        },
        message:
          "Name looks short - try using at least 3 characters for better clarity",
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
    id: "bio",
    name: "Bio",
    type: "RichText",
    required: true,
    validations: [
      {
        size: {
          min: 50,
        },
        message:
          "Bio looks short - try using at least 50 characters for better clarity",
      },
      ...RICH_TEXT_EDITOR_SETTINGS,
    ],
    editor: "richTextEditor",
  },
  {
    id: "specialization",
    name: "Specialization",
    type: "Symbol",
    required: true,
    validations: [
      {
        in: ["Fitness", "Mindfulness", "Nutrition", "Therapy", "Yoga"],
      },
    ],
    editor: "singleLine",
  },
  {
    id: "profilePicture",
    name: "Profile Picture",
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
    id: "isActive",
    name: "Is Active",
    type: "Boolean",
    required: true,
    defaultValue: {
      "en-US": false,
    },
    editor: "boolean",
  },
  {
    id: "joinedAt",
    name: "Joined At",
    type: "Date",
    required: true,
    editor: "datePicker",
  },
  {
    id: "socialLinks",
    name: "Social Links",
    type: "Link",
    linkType: "Entry",
    validations: [
      {
        linkContentType: ["socialLinks"],
      },
    ],
    editor: "entryCardEditor",
  },
];

export const coachSchema: ContentTypeSchema = {
  id: CONTENT_TYPES.COACH,
  name: "Coach",
  displayField: "name",
  fields: coachFields,
};
