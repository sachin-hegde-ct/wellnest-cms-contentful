import { Migration } from "../../../framework/types/migration";
import { createContentType } from "../../../framework/contentful/create-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { coachSchema } from "../../schema/coach.schema";
import { printDryRunCreateContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const createCoachContentType: Migration = {
  id: "create-content-type-coach",
  kind: "create",
  target: CONTENT_TYPES.COACH,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunCreateContentType(coachSchema, {
        validationSpacer: 60,
      });
    }

    await createContentType(coachSchema);
  },
};

export default createCoachContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, createCoachContentType);
