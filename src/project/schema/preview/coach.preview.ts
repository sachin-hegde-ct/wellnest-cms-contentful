import { ContentTypePreview } from "../../../framework/schema/schema-types";

export const coachPreview: ContentTypePreview = {
  id: "coach",
  displayField: "name",
  fields: [
    {
      id: "name",
      label: "Name",
      type: "Symbol",
      required: true,
      validations: [{ kind: "minLength", value: 3 }],
    },
    {
      id: "slug",
      label: "Slug",
      type: "Symbol",
      required: true,
      ui: [{ kind: "slug", from: "name" }],
    },
    {
      id: "bio",
      label: "Bio",
      type: "RichText",
      required: true,
      validations: [
        { kind: "minLength", value: 50 },
        {
          kind: "richText",
          description: "RICH_TEXT_EDITOR_SETTINGS applied",
        },
      ],
    },
    {
      id: "specialization",
      label: "Specialization",
      type: "Symbol",
      required: true,
      validations: [
        {
          kind: "enum",
          values: ["Fitness", "Mindfulness", "Nutrition", "Therapy", "Yoga"],
        },
      ],
    },
    {
      id: "profilePicture",
      label: "Profile Picture",
      type: "Link",
      required: true,
      link: {
        target: "Entry",
        contentTypes: ["imageWrapper"],
      },
      ui: [{ kind: "entryCard" }],
    },
    {
      id: "isActive",
      label: "Is Active",
      type: "Boolean",
      required: true,
      defaultValue: false,
    },
    {
      id: "joinedAt",
      label: "Joined At",
      type: "Date",
      required: true,
    },
    {
      id: "socialLinks",
      label: "Social Links",
      type: "Link",
      required: false,
      link: {
        target: "Entry",
        contentTypes: ["socialLinks"],
      },
      ui: [{ kind: "entryCard" }],
    },
  ],
};
