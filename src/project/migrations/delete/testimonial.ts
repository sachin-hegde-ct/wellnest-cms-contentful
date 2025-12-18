import { Migration } from "../../../framework/types/migration";
import { deleteContentType } from "../../../framework/contentful/delete-content-type";
import {
  resolveDryRun,
  isDirectExecution,
} from "../../../framework/cli/standalone";
import { CONTENT_TYPES } from "../../config/content-types";

const deleteTestimonialContentType: Migration = {
  id: "delete-content-type-testimonial",
  kind: "delete",
  target: CONTENT_TYPES.TESTIMONIAL,

  async run({ dryRun }) {
    await deleteContentType(CONTENT_TYPES.TESTIMONIAL, dryRun);
  },
};

export default deleteTestimonialContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */

async function runStandalone() {
  await import("dotenv/config");
  const dryRun = resolveDryRun();
  await deleteTestimonialContentType.run({ dryRun });
}

if (isDirectExecution(import.meta.url)) {
  runStandalone().catch((err) => {
    console.error("\n❌ Standalone execution failed:", err);
    process.exit(1);
  });
}
