import { createEntry } from "../../../framework/contentful/create-entry";
import { CONTENT_TYPES } from "../../config/content-types";

export async function createCoachEntry(
  coach: any,
  image: any,
  socialLinksId?: string | null
) {
    const entry = await createEntry(CONTENT_TYPES.COACH, {
      name: { "en-US": coach.name },
      slug: { "en-US": coach.slug },
      bio: { "en-US": coach.bio },
      isActive: { "en-US": coach.isActive },
      joinedAt: { "en-US": coach.joinedAt },
      specialization: { "en-US": coach.specialization },
      profilePicture: { "en-US": image },
      socialLinks: socialLinksId
        ? {
            "en-US": {
              sys: {
                type: "Link",
                linkType: "Entry",
                id: socialLinksId,
              },
            },
          }
        : undefined,
    });

  return entry.sys.id;
}
