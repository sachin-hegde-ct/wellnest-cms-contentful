import { cleanupArticles } from "./articles";
import { cleanupCoaches } from "./coaches";
import { cleanupPrograms } from "./programs";
import { cleanupTestimonials } from "./testimonials";

const CLEANUP_IN_ORDER = [
  cleanupTestimonials,
  cleanupPrograms,
  cleanupArticles,
  cleanupCoaches,
];

export const runCleanupAll = async () => {
  console.log(
    `\n============== 🧹  CLEANUP ALL IMPORTED DATA ==============\n`
  );

  for (const fn of CLEANUP_IN_ORDER) {
    await fn();
  }

  console.log(`\n🎉 All imported data deleted successfully.\n`);
  console.log(
    `=============================================================\n`
  );
};

// Auto-run only when executed directly from terminal
if (import.meta.url === `file://${process.argv[1]}`) {
  runCleanupAll();
}
