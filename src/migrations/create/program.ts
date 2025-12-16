import { MigrationFunction } from "contentful-migration";
import { CONTENT_TYPES } from "../../constants/content-types";
import { RICH_TEXT_EDITOR_SETTINGS } from "../../constants/rich-text-editor";
import { createContentType } from "../../scripts/create-content-type";

export const programContentTypeMigration: MigrationFunction = (migration) => {
  const type = migration.createContentType(CONTENT_TYPES.PROGRAM, {
    name: "Program",
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

  type.createField("slug").name("Slug").type("Symbol").required(true);
  type.changeFieldControl("slug", "builtin", "slugEditor", {
    trackingFieldId: "title",
    helpText: "Slug is automatically generated from the Title field",
  });

  type
    .createField("summary")
    .name("Summary")
    .type("Text")
    .required(true)
    .validations([
      {
        size: { min: 30 },
        message:
          "Summary looks short - try using at least 30 characters for better clarity",
      },
    ]);
  type.changeFieldControl("summary", "builtin", "multipleLine");

  type
    .createField("description")
    .name("Description")
    .type("RichText")
    .required(true)
    .validations([
      {
        size: {
          min: 100,
        },
        message:
          "Content looks short - try using at least 100 characters for better clarity",
      },
      ...RICH_TEXT_EDITOR_SETTINGS,
    ]);

  type
    .createField("difficultyLevel")
    .name("Difficulty Level")
    .type("Symbol")
    .required(true)
    .validations([
      {
        in: ["Beginner", "Intermediate", "Advanced"],
      },
    ]);

  type
    .createField("durationWeeks")
    .name("Duration Weeks")
    .type("Integer")
    .defaultValue({ "en-US": 1 })
    .validations([
      {
        range: {
          min: 1,
          max: 52,
        },
      },
    ]);

  type
    .createField("isFeatured")
    .name("Is Featured")
    .type("Boolean")
    .defaultValue({ "en-US": false });

  type.createField("startDate").name("Start Date").type("Date").required(true);

  type
    .createField("bannerImage")
    .name("Banner Image")
    .type("Link")
    .linkType("Entry")
    .required(true)
    .validations([
      {
        linkContentType: ["imageWrapper"],
      },
    ]);

  type
    .createField("coach")
    .name("Coach")
    .type("Link")
    .linkType("Entry")
    .required(true)
    .validations([
      {
        linkContentType: ["coach"],
      },
    ]);

  type
    .createField("sessions")
    .name("Sessions")
    .type("Array")
    .required(true)
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [
        {
          linkContentType: ["programSession"],
        },
      ],
    });
};

// ------------------------------------------------------------------
// AUTO-EXECUTION WHEN RUN DIRECTLY VIA TERMINAL
// ------------------------------------------------------------------

// If this file is executed directly (e.g. `tsx program.ts`),
// then run the migration. Otherwise, if it is imported, DO NOTHING.
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    await createContentType(CONTENT_TYPES.PROGRAM, programContentTypeMigration);
  })();
}
