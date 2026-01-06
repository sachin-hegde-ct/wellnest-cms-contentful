import { MigrationFunction } from "contentful-migration";
import { URL_PATTERN } from "../config/regex";
import { CONTENT_TYPES } from "../config/content-types";

export const socialLinksSchema: MigrationFunction = (
  migration
) => {
  const type = migration.createContentType(CONTENT_TYPES.SOCIAL_LINKS, {
    name: "Social Links",
    displayField: "title",
  });

  type.createField("title").name("Title").type("Symbol").required(true);

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
