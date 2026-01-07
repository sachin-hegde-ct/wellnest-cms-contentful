import { Migration } from "../../framework/types/migration";

/* ------------------------------------------------------------------ */
/* DELETE CONTENT TYPES                                               */
/* ------------------------------------------------------------------ */
import deleteImageWrapperContentType from "./delete/image-wrapper";
import deleteSocialLinksContentType from "./delete/social-links";
import deleteProgramSessionContentType from "./delete/program-session";
import deleteTestimonialContentType from "./delete/testimonial";
import deleteArticleContentType from "./delete/article";
import deleteProgramContentType from "./delete/program";
import deleteCoachContentType from "./delete/coach";

/* ------------------------------------------------------------------ */
/* CREATE CONTENT TYPES                                               */
/* ------------------------------------------------------------------ */
import createImageWrapperContentType from "./create/image-wrapper";
import createSocialLinksContentType from "./create/social-links";
import createProgramSessionContentType from "./create/program-session";
import createCoachContentType from "./create/coach";
import createProgramContentType from "./create/program";
import createArticleContentType from "./create/article";
import createTestimonialContentType from "./create/testimonial";

/* ------------------------------------------------------------------ */
/* IMPORT ENTRIES                                                     */
/* ------------------------------------------------------------------ */
import importCoaches from "./import/coaches";
import importPrograms from "./import/programs";
import importArticles from "./import/articles";
import importTestimonials from "./import/testimonials";

const migrateAll: Migration = {
  id: "migrate-all",
  kind: "migrate",
  target: "all",

  async run({ dryRun }) {
    console.log("\n" + "=".repeat(60) + "\n");
    console.log(
      `\n🏗️  MIGRATION → ALL\n` +
        `This will delete existing data and recreate everything.\n`,
    );

    /* ------------------------------------------------------
     * DELETE CONTENT TYPES
     * ------------------------------------------------------ */
    await deleteTestimonialContentType.run({ dryRun });
    await deleteArticleContentType.run({ dryRun });
    await deleteProgramSessionContentType.run({ dryRun });
    await deleteProgramContentType.run({ dryRun });
    await deleteCoachContentType.run({ dryRun });
    await deleteSocialLinksContentType.run({ dryRun });
    await deleteImageWrapperContentType.run({ dryRun });

    /* ------------------------------------------------------
     * CREATE CONTENT TYPES
     * ------------------------------------------------------ */
    await createImageWrapperContentType.run({ dryRun });
    await createSocialLinksContentType.run({ dryRun });
    await createCoachContentType.run({ dryRun });
    await createProgramContentType.run({ dryRun });
    await createProgramSessionContentType.run({ dryRun });
    await createArticleContentType.run({ dryRun });
    await createTestimonialContentType.run({ dryRun });

    /* ------------------------------------------------------
     * IMPORT ENTRIES
     * ------------------------------------------------------ */
    await importCoaches.run({ dryRun });
    await importPrograms.run({ dryRun });
    await importArticles.run({ dryRun });
    await importTestimonials.run({ dryRun });

    console.log(dryRun ? "" : `\n\n🎉 Migration completed successfully.\n`);
    console.log("\n" + "=".repeat(60) + "\n");
  },
};

export default migrateAll;
