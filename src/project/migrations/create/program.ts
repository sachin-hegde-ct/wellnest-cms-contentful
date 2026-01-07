import { Migration } from "../../../framework/types/migration";
import { createContentType } from "../../../framework/contentful/create-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { printDryRunCreateContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";
import { programSchema } from "../../schema/program.schema";

const createProgramContentType: Migration = {
  id: "create-content-type-program",
  kind: "create",
  target: CONTENT_TYPES.PROGRAM,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunCreateContentType(programSchema);
    }

    await createContentType(programSchema);
  },
};

export default createProgramContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(createProgramContentType);
