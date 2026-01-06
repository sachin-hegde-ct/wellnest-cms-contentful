import { getContentfulContext } from "../../../framework/contentful/environment";
import { getEntries } from "../../../framework/contentful/get-entries";


export async function assignRandomArticleAuthor() {
  const { contentfulEnvironment } = await getContentfulContext();

  const meta = await getEntries({
    content_type: "coach",
    limit: 0,
  });

  if (meta.total === 0) {
    throw new Error("❌ No coaches found in Contentful.");
  }

  const randomIndex = Math.floor(Math.random() * meta.total);

  const res = await getEntries({
    content_type: "coach",
    limit: 1,
    skip: randomIndex,
  });

  const coach = res.items[0];

  return {
    author: {
      sys: {
        type: "Link",
        linkType: "Entry",
        id: coach.sys.id,
      },
    },
    coachId: coach.sys.id,
  };
}
