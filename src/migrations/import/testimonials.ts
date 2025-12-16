import { assignTestimonialPrograms } from "../../utils/testimonials/assign-testimonial-programs";
import { importTestimonials } from "../../utils/testimonials/import-testimonials";

export const runTestimonialDataImport = async () => {
  console.log(
    `\n---------------------------------------------------------\n\n` +
      `🚀 Operation: Import, Entry: Testimonial\n`
  );

  try {
    console.log(`\n 🔹 Assigning Programs to testimonials...\n`);
    await assignTestimonialPrograms();
    console.log(`\n   ✅ Assigning Programs COMPLETED.\n`);
  } catch (err) {
    console.error(`❌ Assigning Programs FAILED: ${(err as Error).message}`);
    process.exit(1);
  }

  try {
    console.log(`\n 🔹 Creating Testimonial entries...\n`);
    await importTestimonials();
    console.log(`\n   ✅ Creating Testimonial entries COMPLETED.\n`);
  } catch (err) {
    console.error(
      `❌ Creating Testimonial entries FAILED: ${(err as Error).message}`
    );
    process.exit(1);
  }

  console.log(
    `\n🎉 Testimonial entries imported successfully.\n` +
      `\n---------------------------------------------------------\n`
  );
};

// AUTO EXECUTE
if (import.meta.url === `file://${process.argv[1]}`) {
  runTestimonialDataImport();
}
