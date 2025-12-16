import fs from "fs/promises";
import { ARTICLE_DATA_DIR } from "../../constants/data-dir";
import { getContentful } from "../../scripts/contentful";

export async function assignArticleAuthors() {
  const { contentfulEnvironment } = await getContentful();

  const articles = JSON.parse(
    await fs.readFile(ARTICLE_DATA_DIR.FINAL, "utf8")
  );

  const updated = [...articles];
  const authorRefs: Record<string, any> = {};

  // GET TOTAL NUMBER OF COACHES
  const meta = await contentfulEnvironment.getEntries({
    content_type: "coach",
    limit: 0,
    skip: 0,
  });

  const total = meta.total;

  if (total === 0) {
    throw new Error("❌ No coaches found in Contentful.");
  }

  for (let [index, article] of updated.entries()) {
    const randomIndex = Math.floor(Math.random() * total);

    const res = await contentfulEnvironment.getEntries({
      content_type: "coach",
      limit: 1,
      skip: randomIndex,
    });

    const randomCoach = res.items[0];
    const coachId = randomCoach.sys.id;

    article.author = {
      sys: {
        type: "Link",
        linkType: "Entry",
        id: coachId,
      },
    };

    authorRefs[article.slug] = {
      coach: coachId,
    };

    console.log(
      `   👤 [${index + 1}/${updated.length}] Assigned author ${
        randomCoach.fields.name["en-US"]
      } → ${article.title}\n`
    );
  }

  await fs.writeFile(ARTICLE_DATA_DIR.FINAL, JSON.stringify(updated, null, 2));
  await fs.writeFile(
    ARTICLE_DATA_DIR.AUTHORS_MAP,
    JSON.stringify(authorRefs, null, 2)
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  assignArticleAuthors();
}
