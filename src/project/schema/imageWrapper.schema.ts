import type { ContentTypeField, ContentTypeSchema } from "../../framework/types/content-type";
import { CONTENT_TYPES } from "../config/content-types";

const imageWrapperFields: ContentTypeField[] = [
  {
    id: "title",
    name: "Title",
    type: "Symbol",
    required: true,
    editor: "singleLine",
  },
  {
    id: "description",
    name: "Description",
    type: "Text",
    editor: "multipleLine",
  },
  {
    id: "media",
    name: "Media",
    type: "Link",
    linkType: "Asset",
    required: true,
    validations: [
      {
        linkMimetypeGroup: ["image"],
      },
    ],
    editor: "assetLinkEditor",
  },
  {
    id: "altText",
    name: "Alt Text",
    type: "Symbol",
    editor: "singleLine",
  },
];

export const imageWrapperSchema: ContentTypeSchema = {
  id: CONTENT_TYPES.IMAGE_WRAPPER,
  name: "Image Wrapper",
  displayField: "title",
  fields: imageWrapperFields,
};
