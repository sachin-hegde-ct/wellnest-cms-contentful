import { Migration } from "../../../framework/types/migration";
import { createContentType } from "../../../framework/contentful/create-content-type";
import { CONTENT_TYPES } from "../../config/content-types";
import { articleSchema } from "../../schema/article";
import { articlePreview } from "../../schema/preview/article.preview";
import { printDryRunCreateContentType } from "../../../framework/helpers/print-dry-run";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const createArticleContentType: Migration = {
  id: "create-content-type-article",
  kind: "create",
  target: CONTENT_TYPES.ARTICLE,

  async run({ dryRun }) {
    if (dryRun) {
      return await printDryRunCreateContentType(CONTENT_TYPES.ARTICLE, articlePreview);
    }

    await createContentType(CONTENT_TYPES.ARTICLE, articleSchema);
  },
};

export default createArticleContentType;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, createArticleContentType);
