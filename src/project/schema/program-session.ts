import { MigrationFunction } from "contentful-migration";
import { CONTENT_TYPES } from "../config/content-types";
import { URL_PATTERN } from "../config/regex";

export const programSessionSchema: MigrationFunction = (
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
