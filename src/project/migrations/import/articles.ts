import { Migration } from "../../../framework/types/migration";
import { contentTypeExists } from "../../../framework/contentful/content-type-check";
import { CONTENT_TYPES } from "../../config/content-types";

import { importArticles } from "../../utils/articles/import";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const importArticlesMigration: Migration = {
  id: "import-entry-articles",
  kind: "import",
  target: CONTENT_TYPES.ARTICLE,

  async run({ dryRun }) {
    console.log("\n" + "-".repeat(60) + "\n");
    console.log(`\n🚀 Import → Articles\n`);

    const exists = await contentTypeExists(CONTENT_TYPES.ARTICLE);

    if (!exists) {
      console.log(
        `ℹ️  Content type '${CONTENT_TYPES.ARTICLE}' does not exist.\n`
      );
      return;
    }

    if (dryRun) {
      console.log(`   [dry-run] Would import article entries\n`);
    }

    await importArticles({ dryRun });

    console.log("\n" + "-".repeat(60) + "\n");
  },
};

export default importArticlesMigration;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(import.meta.url, importArticlesMigration);
