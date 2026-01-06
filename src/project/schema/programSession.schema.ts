import {
  ContentTypeField,
  ContentTypeSchema,
} from "../../framework/types/content-type";
import { CONTENT_TYPES } from "../config/content-types";
import { URL_PATTERN } from "../config/regex";

const programSessionFields: ContentTypeField[] = [
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
    id: "sessionDate",
    name: "Session Date",
    type: "Date",
    required: true,
    editor: "datePicker",
  },
  {
    id: "videoUrl",
    name: "Video URL",
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
    id: "notes",
    name: "Notes",
    type: "Text",
    editor: "multipleLine",
  },
];

export const programSessionSchema: ContentTypeSchema = {
  id: CONTENT_TYPES.PROGRAM_SESSION,
  name: "Program Session",
  displayField: "title",
  fields: programSessionFields,
};
