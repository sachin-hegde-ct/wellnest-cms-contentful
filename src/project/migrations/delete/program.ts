import { Migration } from "../../../framework/types/migration";
import { deleteContentType } from "../../../framework/contentful/delete-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { printDryRunDeleteContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";
import { programSchema } from "../../schema/program.schema";

const deleteProgramContentType: Migration = {
  id: "delete-content-type-program",
  kind: "delete",
  target: CONTENT_TYPES.PROGRAM,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunDeleteContentType(programSchema);
    }

    await deleteContentType(CONTENT_TYPES.PROGRAM);
  },
};

export default deleteProgramContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, deleteProgramContentType);
