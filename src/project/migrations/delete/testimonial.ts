import { Migration } from "../../../framework/types/migration";
import { deleteContentType } from "../../../framework/contentful/delete-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { testimonialPreview } from "../../schema/preview/testimonial.preview";
import { printDryRunDeleteContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const deleteTestimonialContentType: Migration = {
  id: "delete-content-type-testimonial",
  kind: "delete",
  target: CONTENT_TYPES.TESTIMONIAL,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunDeleteContentType(
        CONTENT_TYPES.TESTIMONIAL,
        testimonialPreview
      );
    }

    await deleteContentType(CONTENT_TYPES.TESTIMONIAL);
  },
};

export default deleteTestimonialContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, deleteTestimonialContentType);
