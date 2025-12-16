import { runArticleDataImport } from "./articles";
import { runCoachDataImport } from "./coaches";
import { runProgramDataImport } from "./programs";
import { runTestimonialDataImport } from "./testimonials";

const IMPORT_IN_ORDER = [
  runCoachDataImport,
  runArticleDataImport,
  runProgramDataImport,
  runTestimonialDataImport,
];

export const runImportAll = async () => {
  console.log(`\n========== 🏗️  IMPORT ALL DATA ==========\n`);

  for (const fn of IMPORT_IN_ORDER) {
    await fn();
  }

  console.log(`\n🎉 All data imported successfully.`);
  console.log(
    `\n============================================================\n`
  );
};

// Auto-run only when executed directly from terminal
if (import.meta.url === `file://${process.argv[1]}`) {
  runImportAll();
}
