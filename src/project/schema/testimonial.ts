import { MigrationFunction } from "contentful-migration";
import { CONTENT_TYPES } from "../config/content-types";

export const testimonialSchema: MigrationFunction = (migration) => {
  const type = migration.createContentType(CONTENT_TYPES.TESTIMONIAL, {
    name: "Testimonial",
    displayField: "name",
  });

  type
    .createField("name")
    .name("Name")
    .type("Symbol")
    .required(true)
    .validations([
      {
        size: { min: 5 },
        message:
          "Name looks short - try using at least 5 characters for better clarity",
      },
    ]);

  type
    .createField("quote")
    .name("Quote")
    .type("Text")
    .required(true)
    .validations([
      {
        size: { min: 20 },
        message:
          "Quote looks short - try using at least 20 characters for better clarity",
      },
    ]);

  type.changeFieldControl("quote", "builtin", "multipleLine");

  type
    .createField("rating")
    .name("Rating")
    .type("Symbol")
    .required(true)
    .validations([{ in: ["1", "2", "3", "4", "5"] }]);

  type
    .createField("isApproved")
    .name("Is Approved")
    .type("Boolean")
    .defaultValue({ "en-US": false });

  type.createField("date").name("Date").type("Date").required(true);

  type
    .createField("relatedProgram")
    .name("Related Program")
    .type("Link")
    .linkType("Entry")
    .required(true)
    .validations([{ linkContentType: ["program"] }]);
};
