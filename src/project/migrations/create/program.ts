import { Migration } from "../../../framework/types/migration";
import { createContentType } from "../../../framework/contentful/create-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { programSchema } from "../../schema/program";
import { programPreview } from "../../schema/preview/program.preview";
import { printDryRunCreateContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const createProgramContentType: Migration = {
  id: "create-content-type-program",
  kind: "create",
  target: CONTENT_TYPES.PROGRAM,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunCreateContentType(
        CONTENT_TYPES.PROGRAM,
        programPreview
      );
    }

    await createContentType(CONTENT_TYPES.PROGRAM, programSchema);
  },
};

export default createProgramContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, createProgramContentType);
