import { Migration } from "../../../framework/types/migration";
import { createContentType } from "../../../framework/contentful/create-content-type";
import { testimonialSchema } from "../../schema/testimonial";
import { CONTENT_TYPES } from "../../config/content-types";
import { testimonialPreview } from "../../schema/preview/testimonial.preview";
import { printDryRunCreateContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const createTestimonialContentType: Migration = {
  id: "create-content-type-testimonial",
  kind: "create",
  target: CONTENT_TYPES.TESTIMONIAL,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunCreateContentType(
        CONTENT_TYPES.TESTIMONIAL,
        testimonialPreview
      );
    }

    await createContentType(CONTENT_TYPES.TESTIMONIAL, testimonialSchema);
  },
};

export default createTestimonialContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, createTestimonialContentType);
