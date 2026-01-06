import { Migration } from "../../../framework/types/migration";
import { deleteContentType } from "../../../framework/contentful/delete-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { imageWrapperPreview } from "../../schema/preview/image-wrapper.preview";
import { printDryRunDeleteContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const deleteImageWrapperContentType: Migration = {
  id: "delete-content-type-image-wrapper",
  kind: "delete",
  target: CONTENT_TYPES.IMAGE_WRAPPER,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunDeleteContentType(
        CONTENT_TYPES.IMAGE_WRAPPER,
        imageWrapperPreview
      );
    }

    await deleteContentType(CONTENT_TYPES.IMAGE_WRAPPER);
  },
};

export default deleteImageWrapperContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, deleteImageWrapperContentType);
