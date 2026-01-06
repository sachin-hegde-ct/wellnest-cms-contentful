import { createEntry } from "../../../framework/contentful/create-entry";
import { CONTENT_TYPES } from "../../config/content-types";

export async function createTestimonialEntry(
  testimonial: any,
  relatedProgram: any
) {
  const entry = await createEntry(CONTENT_TYPES.TESTIMONIAL, {
    name: { "en-US": testimonial.name },
    quote: { "en-US": testimonial.quote },
    rating: { "en-US": testimonial.rating },
    isApproved: { "en-US": testimonial.isApproved },
    date: { "en-US": testimonial.date },
    relatedProgram: { "en-US": relatedProgram },
  });

  return entry.sys.id;
}
