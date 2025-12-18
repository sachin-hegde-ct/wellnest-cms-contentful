import { Migration } from "../../../framework/types/migration";
import { createContentType } from "../../../framework/contentful/create-content-type";
import {
  resolveDryRun,
  isDirectExecution,
} from "../../../framework/cli/standalone";
import { testimonialSchema } from "../../schema/testimonial";
import { CONTENT_TYPES } from "../../config/content-types";

const createTestimonialContentType: Migration = {
  id: "create-content-type-testimonial",
  kind: "create",
  target: CONTENT_TYPES.TESTIMONIAL,

  async run({ dryRun }) {
    await createContentType(
      CONTENT_TYPES.TESTIMONIAL,
      testimonialSchema,
      dryRun
    );
  },
};

export default createTestimonialContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */

async function runStandalone() {
  await import("dotenv/config");
  const dryRun = resolveDryRun();
  await createTestimonialContentType.run({ dryRun });
}

if (isDirectExecution(import.meta.url)) {
  runStandalone().catch((err) => {
    console.error("\n❌ Standalone execution failed:", err);
    process.exit(1);
  });
}
