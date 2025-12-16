import { MigrationFunction } from "contentful-migration";
import { CONTENT_TYPES } from "../../constants/content-types";
import { createContentType } from "../../scripts/create-content-type";
import { URL_PATTERN } from "../../constants/regex";

export const programSessionContentTypeMigration: MigrationFunction = (
  migration
) => {
  const type = migration.createContentType(CONTENT_TYPES.PROGRAM_SESSION, {
    name: "Program Session",
    displayField: "title",
  });

  type
    .createField("title")
    .name("Title")
    .type("Symbol")
    .required(true)
    .validations([
      {
        size: {
          min: 5,
        },
        message:
          "Title looks short - try using at least 5 characters for better clarity",
      },
    ]);

  type
    .createField("sessionDate")
    .name("Session Date")
    .type("Date")
    .required(true);

  type
    .createField("videoUrl")
    .name("Video URL")
    .type("Symbol")
    .validations([
      {
        regexp: {
          pattern: URL_PATTERN,
        },
      },
    ]);

  type.createField("notes").name("Notes").type("Text");
  type.changeFieldControl("notes", "builtin", "multipleLine");
};

// ------------------------------------------------------------------
// AUTO-EXECUTION WHEN RUN DIRECTLY VIA TERMINAL
// ------------------------------------------------------------------

// If this file is executed directly (e.g. `tsx program-session.ts`),
// then run the migration. Otherwise, if it is imported, DO NOTHING.
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    await createContentType(
      CONTENT_TYPES.PROGRAM_SESSION,
      programSessionContentTypeMigration
    );
  })();
}
