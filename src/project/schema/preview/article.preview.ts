import { ContentTypePreview } from "../../../framework/schema/schema-types";

export const articlePreview: ContentTypePreview = {
  id: "article",
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
      id: "content",
      label: "Content",
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
      id: "category",
      label: "Category",
      type: "Symbol",
      required: true,
      validations: [
        {
          kind: "enum",
          values: ["Nutrition", "Mindfulness", "Fitness", "Sleep"],
        },
      ],
    },
    {
      id: "isPublished",
      label: "Is Published",
      type: "Boolean",
      required: false,
      defaultValue: false,
    },
    {
      id: "publishDate",
      label: "Publish Date",
      type: "Date",
      required: false,
    },
    {
      id: "coverImage",
      label: "Cover Image",
      type: "Link",
      required: true,
      link: {
        target: "Entry",
        contentTypes: ["imageWrapper"],
      },
    },
    {
      id: "readingTime",
      label: "Reading Time",
      type: "Integer",
      required: false,
      defaultValue: 1,
      validations: [{ kind: "range", min: 1, max: 60 }],
    },
    {
      id: "author",
      label: "Author",
      type: "Link",
      required: true,
      link: {
        target: "Entry",
        contentTypes: ["coach"],
      },
    },
    {
      id: "tags",
      label: "Tags",
      type: "Array",
      required: false,
      items: {
        itemType: "Symbol",
      },
    },
  ],
};
