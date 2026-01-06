import { ContentTypePreview } from "../../../framework/schema/schema-types";

export const programSessionPreview: ContentTypePreview = {
  id: "programSession",
  displayField: "title",
  fields: [
    {
      id: "title",
      label: "Title",
      type: "Symbol",
      required: true,
      validations: [{ kind: "minLength", value: 5 }],
    },
    {
      id: "sessionDate",
      label: "Session Date",
      type: "Date",
      required: true,
    },
    {
      id: "videoUrl",
      label: "Video URL",
      type: "Symbol",
      required: false,
      validations: [
        {
          kind: "regex",
          description: "URL_PATTERN",
        },
      ],
    },
    {
      id: "notes",
      label: "Notes",
      type: "Text",
      required: false,
      ui: [{ kind: "multiline" }],
    },
  ],
};
