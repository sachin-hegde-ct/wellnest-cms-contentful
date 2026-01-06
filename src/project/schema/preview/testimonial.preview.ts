import { ContentTypePreview } from "../../../framework/schema/schema-types";

export const testimonialPreview: ContentTypePreview = {
  id: "testimonial",
  displayField: "name",
  fields: [
    {
      id: "name",
      label: "Name",
      type: "Symbol",
      required: true,
      validations: [{ kind: "minLength", value: 5 }],
    },
    {
      id: "quote",
      label: "Quote",
      type: "Text",
      required: true,
      validations: [{ kind: "minLength", value: 20 }],
      ui: [{ kind: "multiline" }],
    },
    {
      id: "rating",
      label: "Rating",
      type: "Symbol",
      required: true,
      validations: [
        {
          kind: "enum",
          values: ["1", "2", "3", "4", "5"],
        },
      ],
    },
    {
      id: "isApproved",
      label: "Is Approved",
      type: "Boolean",
      required: false,
      defaultValue: false,
    },
    {
      id: "date",
      label: "Date",
      type: "Date",
      required: true,
    },
    {
      id: "relatedProgram",
      label: "Related Program",
      type: "Link",
      required: true,
      link: {
        target: "Entry",
        contentTypes: ["program"],
      },
    },
  ],
};
