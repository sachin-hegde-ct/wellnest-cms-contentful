import { Migration } from "../../../framework/types/migration";

// Individual delete migrations
import deleteTestimonialContentType from "./testimonial";
import deleteArticleContentType from "./article";
import deleteProgramSessionContentType from "./program-session";
import deleteProgramContentType from "./program";
import deleteCoachContentType from "./coach";
import deleteSocialLinksContentType from "./social-links";
import deleteImageWrapperContentType from "./image-wrapper";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const DELETE_ORDER = [
  deleteTestimonialContentType,
  deleteArticleContentType,
  deleteProgramSessionContentType,
  deleteProgramContentType,
  deleteCoachContentType,
  deleteSocialLinksContentType,
  deleteImageWrapperContentType,
];

const deleteAllContentTypes: Migration = {
  id: "delete-content-type-all",
  kind: "delete",
  target: "all",

  async run({ dryRun }) {
    console.log("\n" + "=".repeat(60) + "\n");
    console.log(`\n🗑️  DELETE ALL CONTENT TYPES\n`);

    for (const migration of DELETE_ORDER) {
      await migration.run({ dryRun });
    }

    console.log(
      dryRun ? "" : `\n\n🎉 All content types deleted successfully.\n`,
    );
    console.log("=".repeat(60) + "\n");
  },
};

export default deleteAllContentTypes;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(deleteAllContentTypes);
