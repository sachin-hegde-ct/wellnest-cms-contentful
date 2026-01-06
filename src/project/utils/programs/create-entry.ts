import { createEntry } from "../../../framework/contentful/create-entry";
import { CONTENT_TYPES } from "../../config/content-types";

export async function createProgramEntry(
  program: any,
  bannerImage: any,
  coach: any,
  sessions: any
) {
  const entry = await createEntry(CONTENT_TYPES.PROGRAM, {
    title: { "en-US": program.title },
    slug: { "en-US": program.slug },
    summary: { "en-US": program.summary },
    description: { "en-US": program.description },
    difficultyLevel: { "en-US": program.difficultyLevel },
    durationWeeks: { "en-US": program.durationWeeks },
    isFeatured: { "en-US": program.isFeatured },
    startDate: { "en-US": program.startDate },
    bannerImage: { "en-US": bannerImage },
    coach: { "en-US": coach },
    sessions: { "en-US": sessions },
  });

  return entry.sys.id;
}
