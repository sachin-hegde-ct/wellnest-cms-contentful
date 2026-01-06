import { Migration } from "../../../framework/types/migration";
import { deleteContentType } from "../../../framework/contentful/delete-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { printDryRunDeleteContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";
import { socialLinksSchema } from "../../schema/social-links.schema";

const deleteSocialLinksContentType: Migration = {
  id: "delete-content-type-social-links",
  kind: "delete",
  target: CONTENT_TYPES.SOCIAL_LINKS,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunDeleteContentType(socialLinksSchema);
    }

    await deleteContentType(CONTENT_TYPES.SOCIAL_LINKS);
  },
};

export default deleteSocialLinksContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, deleteSocialLinksContentType);
