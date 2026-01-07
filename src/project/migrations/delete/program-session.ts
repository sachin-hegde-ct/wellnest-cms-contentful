import { Migration } from "../../../framework/types/migration";
import { deleteContentType } from "../../../framework/contentful/delete-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { printDryRunDeleteContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";
import { programSessionSchema } from "../../schema/programSession.schema";

const deleteProgramSessionContentType: Migration = {
  id: "delete-content-type-program-session",
  kind: "delete",
  target: CONTENT_TYPES.PROGRAM_SESSION,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunDeleteContentType(programSessionSchema);
    }

    await deleteContentType(CONTENT_TYPES.PROGRAM_SESSION);
  },
};

export default deleteProgramSessionContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(deleteProgramSessionContentType);
