import { ContentTypePreview } from "../../../framework/schema/schema-types";

export const programPreview: ContentTypePreview = {
  id: "program",
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
      id: "slug",
      label: "Slug",
      type: "Symbol",
      required: true,
      ui: [{ kind: "slug", from: "title" }],
    },
    {
      id: "summary",
      label: "Summary",
      type: "Text",
      required: true,
      validations: [{ kind: "minLength", value: 30 }],
      ui: [{ kind: "multiline" }],
    },
    {
      id: "description",
      label: "Description",
      type: "RichText",
      required: true,
      validations: [
        { kind: "minLength", value: 100 },
        {
          kind: "richText",
          description: "RICH_TEXT_EDITOR_SETTINGS applied",
        },
      ],
    },
    {
      id: "difficultyLevel",
      label: "Difficulty Level",
      type: "Symbol",
      required: true,
      validations: [
        {
          kind: "enum",
          values: ["Beginner", "Intermediate", "Advanced"],
        },
      ],
    },
    {
      id: "durationWeeks",
      label: "Duration Weeks",
      type: "Integer",
      required: false,
      defaultValue: 1,
      validations: [{ kind: "range", min: 1, max: 52 }],
    },
    {
      id: "isFeatured",
      label: "Is Featured",
      type: "Boolean",
      required: false,
      defaultValue: false,
    },
    {
      id: "startDate",
      label: "Start Date",
      type: "Date",
      required: true,
    },
    {
      id: "bannerImage",
      label: "Banner Image",
      type: "Link",
      required: true,
      link: {
        target: "Entry",
        contentTypes: ["imageWrapper"],
      },
    },
    {
      id: "coach",
      label: "Coach",
      type: "Link",
      required: true,
      link: {
        target: "Entry",
        contentTypes: ["coach"],
      },
    },
    {
      id: "sessions",
      label: "Sessions",
      type: "Array",
      required: true,
      items: {
        itemType: "Link",
        link: {
          target: "Entry",
          contentTypes: ["programSession"],
        },
      },
    },
  ],
};
