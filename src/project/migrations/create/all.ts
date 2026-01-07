import { Migration } from "../../../framework/types/migration";
import createImageWrapperContentType from "./image-wrapper";
import createSocialLinksContentType from "./social-links";
import createCoachContentType from "./coach";
import createProgramContentType from "./program";
import createProgramSessionContentType from "./program-session";
import createArticleContentType from "./article";
import createTestimonialContentType from "./testimonial";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const CREATE_ORDER = [
  createImageWrapperContentType,
  createSocialLinksContentType,
  createCoachContentType,
  createProgramContentType,
  createProgramSessionContentType,
  createArticleContentType,
  createTestimonialContentType,
];

const createAllContentTypes: Migration = {
  id: "create-content-type-all",
  kind: "create",
  target: "all",

  async run({ dryRun }) {
    console.log("\n" + "=".repeat(60) + "\n");
    console.log(`\n🧱 CREATE ALL CONTENT TYPES\n`);

    for (const migration of CREATE_ORDER) {
      await migration.run({ dryRun });
    }

    console.log(
      dryRun ? "" : `\n\n🎉 All content types created successfully.\n`,
    );
    console.log("=".repeat(60) + "\n");
  },
};

export default createAllContentTypes;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(createAllContentTypes);
