import { Migration } from "../../../framework/types/migration";
import { deleteContentType } from "../../../framework/contentful/delete-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { printDryRunDeleteContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";
import { articleSchema } from "../../schema/article.schema";

const deleteArticleContentType: Migration = {
  id: "delete-content-type-article",
  kind: "delete",
  target: CONTENT_TYPES.ARTICLE,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunDeleteContentType(articleSchema);
    }

    await deleteContentType(CONTENT_TYPES.ARTICLE);
  },
};

export default deleteArticleContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, deleteArticleContentType);
