import { Migration } from "../../../framework/types/migration";
import { createContentType } from "../../../framework/contentful/create-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { programSessionSchema } from "../../schema/program-session";
import { programSessionPreview } from "../../schema/preview/program-session";
import { printDryRunCreateContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const createProgramSessionContentType: Migration = {
  id: "create-content-type-program-session",
  kind: "create",
  target: CONTENT_TYPES.PROGRAM_SESSION,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunCreateContentType(
        CONTENT_TYPES.PROGRAM_SESSION,
        programSessionPreview
      );
    }

    await createContentType(
      CONTENT_TYPES.PROGRAM_SESSION,
      programSessionSchema
    );
  },
};

export default createProgramSessionContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, createProgramSessionContentType);
