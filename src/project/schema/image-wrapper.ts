import { MigrationFunction } from "contentful-migration";
import { CONTENT_TYPES } from "../config/content-types";

export const imageWrapperSchema: MigrationFunction = (
  migration
) => {
  const type = migration.createContentType(CONTENT_TYPES.IMAGE_WRAPPER, {
    name: "Image Wrapper",
    displayField: "title",
  });

  type.createField("title").name("Title").type("Symbol").required(true);

  type.createField("description").name("Description").type("Text");
  type.changeFieldControl("description", "builtin", "multipleLine");

  type
    .createField("media")
    .name("Media")
    .type("Link")
    .linkType("Asset")
    .required(true)
    .validations([{ linkMimetypeGroup: ["image"] }]);

  type.createField("altText").name("Alt Text").type("Symbol");
};
