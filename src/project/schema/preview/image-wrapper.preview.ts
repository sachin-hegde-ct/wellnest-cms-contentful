import { ContentTypePreview } from "../../../framework/schema/schema-types";

export const imageWrapperPreview: ContentTypePreview = {
  id: "imageWrapper",
  displayField: "title",
  fields: [
    {
      id: "title",
      label: "Title",
      type: "Symbol",
      required: true,
    },
    {
      id: "description",
      label: "Description",
      type: "Text",
      required: false,
      ui: [{ kind: "multiline" }],
    },
    {
      id: "media",
      label: "Media",
      type: "Link",
      required: true,
      link: {
        target: "Asset",
        contentTypes: ["image"],
      },
    },
    {
      id: "altText",
      label: "Alt Text",
      type: "Symbol",
      required: false,
    },
  ],
};
