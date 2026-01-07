import { Migration } from "../../../framework/types/migration";
import { deleteContentType } from "../../../framework/contentful/delete-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { printDryRunDeleteContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";
import { coachSchema } from "../../schema/coach.schema";

const deleteCoachContentType: Migration = {
  id: "delete-content-type-coach",
  kind: "delete",
  target: CONTENT_TYPES.COACH,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunDeleteContentType(coachSchema, {
        validationSpacer: 60,
      });
    }

    await deleteContentType(CONTENT_TYPES.COACH);
  },
};

export default deleteCoachContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(deleteCoachContentType);
