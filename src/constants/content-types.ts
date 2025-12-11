export const CONTENT_TYPES = {
  IMAGE_WRAPPER: "imageWrapper",
  SOCIAL_LINKS: "socialLinks",
  COACH: "coach",
} as const;

export type ContentTypeId = (typeof CONTENT_TYPES)[keyof typeof CONTENT_TYPES];
