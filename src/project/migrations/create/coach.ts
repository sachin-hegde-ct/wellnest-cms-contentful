import { Migration } from "../../../framework/types/migration";
import { createContentType } from "../../../framework/contentful/create-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { coachSchema } from "../../schema/coach";
import { coachPreview } from "../../schema/preview/coach.preview";
import { printDryRunCreateContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const createCoachContentType: Migration = {
  id: "create-content-type-coach",
  kind: "create",
  target: CONTENT_TYPES.COACH,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunCreateContentType(CONTENT_TYPES.COACH, coachPreview, { validationSpacer: 60 });
    }
    
    await createContentType(CONTENT_TYPES.COACH, coachSchema);
  },
};

export default createCoachContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, createCoachContentType);
