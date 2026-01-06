import { MigrationFunction } from "contentful-migration";
import { CONTENT_TYPES } from "../config/content-types";
import { RICH_TEXT_EDITOR_SETTINGS } from "../config/rich-text-editor";

export const coachSchema: MigrationFunction = (migration) => {
  const type = migration.createContentType(CONTENT_TYPES.COACH, {
    name: "Coach",
    displayField: "name",
  });

  type
    .createField("name")
    .name("Name")
    .type("Symbol")
    .required(true)
    .validations([
      {
        size: {
          min: 3,
        },
        message:
          "Name looks short - try using at least 3 characters for better clarity",
      },
    ]);

  type.createField("slug").name("Slug").type("Symbol").required(true);
  type.changeFieldControl("slug", "builtin", "slugEditor", {
    trackingFieldId: "name",
    helpText: "Slug is automatically generated from the Name field",
  });

  type
    .createField("bio")
    .name("Bio")
    .type("RichText")
    .required(true)
    .validations([
      {
        size: {
          min: 50,
        },
        message:
          "Bio looks short - try using at least 50 characters for better clarity",
      },
      ...RICH_TEXT_EDITOR_SETTINGS,
    ]);

  type
    .createField("specialization")
    .name("Specialization")
    .type("Symbol")
    .required(true)
    .validations([
      {
        in: ["Fitness", "Mindfulness", "Nutrition", "Therapy", "Yoga"],
      },
    ]);

  type
    .createField("profilePicture")
    .name("Profile Picture")
    .type("Link")
    .linkType("Entry")
    .required(true)
    .validations([
      {
        linkContentType: ["imageWrapper"],
      },
    ]);
  type.changeFieldControl("profilePicture", "builtin", "entryCardEditor", {});

  type
    .createField("isActive")
    .name("Is Active")
    .type("Boolean")
    .required(true)
    .defaultValue({
      "en-US": false,
    });

  type.createField("joinedAt").name("Joined At").type("Date").required(true);

  type
    .createField("socialLinks")
    .name("Social Links")
    .type("Link")
    .linkType("Entry")
    .validations([
      {
        linkContentType: ["socialLinks"],
      },
    ]);
  type.changeFieldControl("socialLinks", "builtin", "entryCardEditor", {});
};
