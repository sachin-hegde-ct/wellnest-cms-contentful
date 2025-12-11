import { CONTENT_TYPES } from "../../constants/content-types";
import { URL_PATTERN } from "../../constants/regex";
import { createContentType } from "../../scripts/create-content-type";
import type { MigrationFunction } from "contentful-migration";

export const socialLinksContentTypeMigration: MigrationFunction = (migration) => {
  const type = migration.createContentType(CONTENT_TYPES.SOCIAL_LINKS, {
    name: "Social Links",
    displayField: "title"
  });

  type.createField('title').name("Title").type("Symbol").required(true);
  
  type
    .createField("instagram")
    .name("Instagram")
    .type("Symbol")
    .validations([
      {
        regexp: {
          pattern: URL_PATTERN,
        },
      },
    ]);
  
  type
    .createField("linkedin")
    .name("LinkedIn")
    .type("Symbol")
    .validations([
      {
        regexp: {
          pattern: URL_PATTERN,
        },
      },
    ]);
  
  type
    .createField("website")
    .name("Website")
    .type("Symbol")
    .validations([
      {
        regexp: {
          pattern: URL_PATTERN,
        },
      },
    ]);

};

// ------------------------------------------------------------------
// AUTO-EXECUTION WHEN RUN DIRECTLY VIA TERMINAL
// ------------------------------------------------------------------

// If this file is executed directly (e.g. `tsx social-links.ts`),
// then run the migration. Otherwise, if it is imported, DO NOTHING.
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    await createContentType(
      CONTENT_TYPES.SOCIAL_LINKS,
      socialLinksContentTypeMigration
    );
  })();
}
