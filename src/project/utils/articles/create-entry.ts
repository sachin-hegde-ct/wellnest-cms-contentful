/* eslint-disable @typescript-eslint/no-explicit-any */

import { createEntry } from "../../../framework/contentful/create-entry";
import { CONTENT_TYPES } from "../../config/content-types";

export async function createArticleEntry(
  article: any,
  coverImage: any,
  author: any,
) {
  const entry = await createEntry(CONTENT_TYPES.ARTICLE, {
    title: { "en-US": article.title },
    slug: { "en-US": article.slug },
    content: { "en-US": article.content },
    category: { "en-US": article.category },
    isPublished: { "en-US": article.isPublished },
    publishDate: { "en-US": article.publishDate },
    readingTime: { "en-US": article.readingTime },
    tags: { "en-US": article.tags },
    coverImage: { "en-US": coverImage },
    author: { "en-US": author },
  });

  return entry.sys.id;
}
