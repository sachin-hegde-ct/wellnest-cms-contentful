import { Migration } from "../../../framework/types/migration";
import { createContentType } from "../../../framework/contentful/create-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { imageWrapperSchema } from "../../schema/image-wrapper";
import { imageWrapperPreview } from "../../schema/preview/image-wrapper.preview";
import { printDryRunCreateContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const createImageWrapperContentType: Migration = {
  id: "create-content-type-image-wrapper",
  kind: "create",
  target: CONTENT_TYPES.IMAGE_WRAPPER,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunCreateContentType(
        CONTENT_TYPES.IMAGE_WRAPPER,
        imageWrapperPreview,
        {validationSpacer: 20}
      );
    }

    await createContentType(CONTENT_TYPES.IMAGE_WRAPPER, imageWrapperSchema);
  },
};

export default createImageWrapperContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, createImageWrapperContentType);
