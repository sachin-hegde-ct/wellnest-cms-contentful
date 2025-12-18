import { Migration } from "../framework/types/migration";

import migrateAll from "./migrations/all";

import cleanupTestimonials from "./migrations/cleanup/testimonials";
import createTestimonialContentType from "./migrations/create/testimonial";
import deleteTestimonialContentType from "./migrations/delete/testimonial";
import importTestimonials from "./migrations/import/testimonials";
import purgeTestimonials from "./migrations/purge/testimonials";

export const migrations: Migration[] = [
  migrateAll,

  // create content type
  createTestimonialContentType,

  // import entries
  importTestimonials,

  // cleanup entries
  cleanupTestimonials,

  // delete content type
  deleteTestimonialContentType,

  // purge all entries
  purgeTestimonials,
];
