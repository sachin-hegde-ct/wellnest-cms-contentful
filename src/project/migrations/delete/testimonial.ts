import { Migration } from "../../../framework/types/migration";
import { deleteContentType } from "../../../framework/contentful/delete-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { printDryRunDeleteContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";
import { testimonialSchema } from "../../schema/testimonial.schema";

const deleteTestimonialContentType: Migration = {
  id: "delete-content-type-testimonial",
  kind: "delete",
  target: CONTENT_TYPES.TESTIMONIAL,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunDeleteContentType(testimonialSchema);
    }

    await deleteContentType(CONTENT_TYPES.TESTIMONIAL);
  },
};

export default deleteTestimonialContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, deleteTestimonialContentType);
