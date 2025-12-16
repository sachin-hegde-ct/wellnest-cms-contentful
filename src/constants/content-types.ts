export const CONTENT_TYPES = {
  IMAGE_WRAPPER: "imageWrapper",
  SOCIAL_LINKS: "socialLinks",
  COACH: "coach",
  ARTICLE: "article",
  PROGRAM: "program",
  PROGRAM_SESSION: "programSession",
  TESTIMONIAL: "testimonial"
} as const;

export type ContentTypeId = (typeof CONTENT_TYPES)[keyof typeof CONTENT_TYPES];
