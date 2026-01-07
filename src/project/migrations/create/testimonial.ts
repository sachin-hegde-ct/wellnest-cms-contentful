import { Migration } from "../../../framework/types/migration";
import { createContentType } from "../../../framework/contentful/create-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { printDryRunCreateContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";
import { testimonialSchema } from "../../schema/testimonial.schema";

const createTestimonialContentType: Migration = {
  id: "create-content-type-testimonial",
  kind: "create",
  target: CONTENT_TYPES.TESTIMONIAL,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunCreateContentType(testimonialSchema);
    }

    await createContentType(testimonialSchema);
  },
};

export default createTestimonialContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(createTestimonialContentType);
