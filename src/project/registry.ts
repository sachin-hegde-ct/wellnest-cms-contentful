import { Migration } from "../framework/types/migration";

import migrateAll from "./migrations/all";

import createAllContentTypes from "./migrations/create/all";
import createArticleContentType from "./migrations/create/article";
import createCoachContentType from "./migrations/create/coach";
import createImageWrapperContentType from "./migrations/create/image-wrapper";
import createProgramSessionContentType from "./migrations/create/program-session";
import createProgramContentType from "./migrations/create/program";
import createSocialLinksContentType from "./migrations/create/social-links";
import createTestimonialContentType from "./migrations/create/testimonial";

import importAllEntries from "./migrations/import/all";
import importCoaches from "./migrations/import/coaches";
import importArticles from "./migrations/import/articles";
import importPrograms from "./migrations/import/programs";
import importTestimonials from "./migrations/import/testimonials";

import cleanupAllEntries from "./migrations/cleanup/all";
import cleanupArticles from "./migrations/cleanup/articles";
import cleanupCoaches from "./migrations/cleanup/coaches";
import cleanupPrograms from "./migrations/cleanup/programs";
import cleanupTestimonials from "./migrations/cleanup/testimonials";

import deleteAllContentTypes from "./migrations/delete/all";
import deleteArticleContentType from "./migrations/delete/article";
import deleteImageWrapperContentType from "./migrations/delete/image-wrapper";
import deleteCoachContentType from "./migrations/delete/coach";
import deleteSocialLinksContentType from "./migrations/delete/social-links";
import deleteProgramSessionContentType from "./migrations/delete/program-session";
import deleteProgramContentType from "./migrations/delete/program";
import deleteTestimonialContentType from "./migrations/delete/testimonial";

import purgeAllEntries from "./migrations/purge/all";
import purgeArticles from "./migrations/purge/articles";
import purgeAssets from "./migrations/purge/assets";
import purgeCoaches from "./migrations/purge/coaches";
import purgeImageWrappers from "./migrations/purge/image-wrapper";
import purgeProgramSessions from "./migrations/purge/program-sessions";
import purgePrograms from "./migrations/purge/programs";
import purgeSocialLinks from "./migrations/purge/social-links";
import purgeTestimonials from "./migrations/purge/testimonials";

export const migrations: Migration[] = [
  migrateAll,

  // create content type
  createAllContentTypes,
  createArticleContentType,
  createCoachContentType,
  createImageWrapperContentType,
  createProgramSessionContentType,
  createProgramContentType,
  createSocialLinksContentType,
  createTestimonialContentType,

  // import entries
  importAllEntries,
  importArticles,
  importCoaches,
  importPrograms,
  importTestimonials,

  // cleanup entries
  cleanupAllEntries,
  cleanupArticles,
  cleanupCoaches,
  cleanupPrograms,
  cleanupTestimonials,

  // delete content type
  deleteAllContentTypes,
  deleteArticleContentType,
  deleteCoachContentType,
  deleteImageWrapperContentType,
  deleteProgramSessionContentType,
  deleteProgramContentType,
  deleteSocialLinksContentType,
  deleteTestimonialContentType,

  // purge all entries
  purgeAllEntries,
  purgeArticles,
  purgeAssets,
  purgeCoaches,
  purgeImageWrappers,
  purgeProgramSessions,
  purgePrograms,
  purgeSocialLinks,
  purgeTestimonials,
];
