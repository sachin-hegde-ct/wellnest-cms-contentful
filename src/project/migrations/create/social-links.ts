import { Migration } from "../../../framework/types/migration";
import { createContentType } from "../../../framework/contentful/create-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { printDryRunCreateContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";
import { socialLinksSchema } from "../../schema/social-links.schema";

const createSocialLinksContentType: Migration = {
  id: "create-content-type-social-links",
  kind: "create",
  target: CONTENT_TYPES.SOCIAL_LINKS,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunCreateContentType(socialLinksSchema);
    }

    await createContentType(socialLinksSchema);
  },
};

export default createSocialLinksContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, createSocialLinksContentType);
