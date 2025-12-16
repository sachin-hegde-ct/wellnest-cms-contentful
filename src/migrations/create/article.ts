import { MigrationFunction } from "contentful-migration";
import { CONTENT_TYPES } from "../../constants/content-types";
import { RICH_TEXT_EDITOR_SETTINGS } from "../../constants/rich-text-editor";
import { createContentType } from "../../scripts/create-content-type";

export const articleContentTypeMigration: MigrationFunction = (migration) => {
  const type = migration.createContentType(CONTENT_TYPES.ARTICLE, {
    name: "Article",
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
    .createField("content")
    .name("Content")
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
    .createField("category")
    .name("Category")
    .type("Symbol")
    .required(true)
    .validations([
      {
        in: ["Nutrition", "Mindfulness", "Fitness", "Sleep"],
      },
    ]);

  type
    .createField("isPublished")
    .name("Is Published")
    .type("Boolean")
    .defaultValue({ "en-US": false });

  type.createField("publishDate").name("Publish Date").type("Date");

  type
    .createField("coverImage")
    .name("Cover Image")
    .type("Link")
    .linkType("Entry")
    .required(true)
    .validations([
      {
        linkContentType: ["imageWrapper"],
      },
    ]);

  type
    .createField("readingTime")
    .name("Reading Time")
    .type("Integer")
    .defaultValue({ "en-US": 1 })
    .validations([
      {
        range: {
          min: 1,
          max: 60,
        },
      },
    ]);

  type
    .createField("author")
    .name("Author")
    .type("Link")
    .linkType("Entry")
    .required(true)
    .validations([
      {
        linkContentType: ["coach"],
      },
    ]);

  type.createField("tags").name("Tags").type("Array").items({
    type: "Symbol",
  });
};

// ------------------------------------------------------------------
// AUTO-EXECUTION WHEN RUN DIRECTLY VIA TERMINAL
// ------------------------------------------------------------------

// If this file is executed directly (e.g. `tsx article.ts`),
// then run the migration. Otherwise, if it is imported, DO NOTHING.
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    await createContentType(CONTENT_TYPES.ARTICLE, articleContentTypeMigration);
  })();
}
