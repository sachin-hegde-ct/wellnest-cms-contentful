import { Migration } from "../../../framework/types/migration";
import { createContentType } from "../../../framework/contentful/create-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { socialLinksSchema } from "../../schema/social-links";
import { socialLinksPreview } from "../../schema/preview/social-links.preview";
import { printDryRunCreateContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const createSocialLinksContentType: Migration = {
  id: "create-content-type-social-links",
  kind: "create",
  target: CONTENT_TYPES.SOCIAL_LINKS,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunCreateContentType(
        CONTENT_TYPES.SOCIAL_LINKS,
        socialLinksPreview
      );
    }

    await createContentType(CONTENT_TYPES.SOCIAL_LINKS, socialLinksSchema);
  },
};

export default createSocialLinksContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, createSocialLinksContentType);
