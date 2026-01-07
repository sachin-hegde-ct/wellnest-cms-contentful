import { Migration } from "../../../framework/types/migration";
import { createContentType } from "../../../framework/contentful/create-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { printDryRunCreateContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";
import { programSessionSchema } from "../../schema/programSession.schema";

const createProgramSessionContentType: Migration = {
  id: "create-content-type-program-session",
  kind: "create",
  target: CONTENT_TYPES.PROGRAM_SESSION,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunCreateContentType(programSessionSchema);
    }

    await createContentType(programSessionSchema);
  },
};

export default createProgramSessionContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(createProgramSessionContentType);
