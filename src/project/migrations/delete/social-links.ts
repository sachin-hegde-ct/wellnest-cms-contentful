import { Migration } from "../../../framework/types/migration";
import { deleteContentType } from "../../../framework/contentful/delete-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { socialLinksPreview } from "../../schema/preview/social-links.preview";
import { printDryRunDeleteContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const deleteSocialLinksContentType: Migration = {
  id: "delete-content-type-social-links",
  kind: "delete",
  target: CONTENT_TYPES.SOCIAL_LINKS,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunDeleteContentType(
        CONTENT_TYPES.SOCIAL_LINKS,
        socialLinksPreview
      );
    }

    await deleteContentType(CONTENT_TYPES.SOCIAL_LINKS);
  },
};

export default deleteSocialLinksContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, deleteSocialLinksContentType);
