import { Migration } from "../../../framework/types/migration";
import { deleteContentType } from "../../../framework/contentful/delete-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { printDryRunDeleteContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";
import { imageWrapperSchema } from "../../schema/imageWrapper.schema";

const deleteImageWrapperContentType: Migration = {
  id: "delete-content-type-image-wrapper",
  kind: "delete",
  target: CONTENT_TYPES.IMAGE_WRAPPER,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunDeleteContentType(imageWrapperSchema);
    }

    await deleteContentType(CONTENT_TYPES.IMAGE_WRAPPER);
  },
};

export default deleteImageWrapperContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(deleteImageWrapperContentType);
