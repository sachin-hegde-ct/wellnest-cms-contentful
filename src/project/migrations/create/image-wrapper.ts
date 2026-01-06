import { Migration } from "../../../framework/types/migration";
import { createContentType } from "../../../framework/contentful/create-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { printDryRunCreateContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";
import { imageWrapperSchema } from "../../schema/imageWrapper.schema";

const createImageWrapperContentType: Migration = {
  id: "create-content-type-image-wrapper",
  kind: "create",
  target: CONTENT_TYPES.IMAGE_WRAPPER,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunCreateContentType(imageWrapperSchema, {
        validationSpacer: 20,
      });
    }

    await createContentType(imageWrapperSchema);
  },
};

export default createImageWrapperContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, createImageWrapperContentType);
