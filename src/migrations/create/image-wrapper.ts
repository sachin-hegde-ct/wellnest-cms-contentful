import { CONTENT_TYPES } from "../../constants/content-types";
import { createContentType } from "../../scripts/create-content-type";
import type { MigrationFunction } from "contentful-migration";

export const imageWrapperContentTypeMigration: MigrationFunction = (
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

// ------------------------------------------------------------------
// AUTO-EXECUTION WHEN RUN DIRECTLY VIA TERMINAL
// ------------------------------------------------------------------

// If this file is executed directly (e.g. `tsx image-wrapper.ts`),
// then run the migration. Otherwise, if it is imported, DO NOTHING.
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    await createContentType(
      CONTENT_TYPES.IMAGE_WRAPPER,
      imageWrapperContentTypeMigration
    );
  })();
}
