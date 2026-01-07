/* eslint-disable @typescript-eslint/no-explicit-any */

import { createEntry } from "../../../framework/contentful/create-entry";
import { CONTENT_TYPES } from "../../config/content-types";

export async function createCoachSocialLinks(coach: any) {
  if (!coach.socialLinks) return null;

  const entry = await createEntry(CONTENT_TYPES.SOCIAL_LINKS, {
    title: { "en-US": `Social Link: ${coach.name}` },
    instagram: { "en-US": coach.socialLinks.instagram },
    linkedin: { "en-US": coach.socialLinks.linkedin },
    website: { "en-US": coach.socialLinks.website },
  });

  return entry.sys.id;
}
