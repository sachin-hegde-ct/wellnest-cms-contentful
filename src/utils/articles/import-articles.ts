import fs from "fs/promises";
import { createEntry } from "../../scripts/create-entry";
import { CONTENT_TYPES } from "../../constants/content-types";
import { ARTICLE_DATA_DIR } from "../../constants/data-dir";

export async function importArticles() {
  const articles = JSON.parse(
    await fs.readFile(ARTICLE_DATA_DIR.FINAL, "utf8")
  );

  for (const [index, article] of articles.entries()) {
    const entry = await createEntry(CONTENT_TYPES.ARTICLE, {
      title: { "en-US": article.title },
      slug: { "en-US": article.slug },
      content: { "en-US": article.content },
      category: { "en-US": article.category },
      isPublished: { "en-US": article.isPublished },
      publishDate: { "en-US": article.publishDate },
      readingTime: { "en-US": article.readingTime },
      tags: { "en-US": article.tags },
      coverImage: { "en-US": article.coverImage },
      author: { "en-US": article.author },
    });

    // Store the sys.id inside final JSON (good for deletion)
    article.sys = {
      id: entry.sys.id,
      type: "Entry",
      linkType: "Entry",
    };

    console.log(
      `   📝 [${index + 1}/${articles.length}] Created Article entry: ${
        article.title
      }\n`
    );
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  importArticles();
}
