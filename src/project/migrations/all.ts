import { Migration } from "../../framework/types/migration";

// delete
import deleteTestimonialContentType from "./delete/testimonial";

// create
import createTestimonialContentType from "./create/testimonial";

// import
import importTestimonials from "./import/testimonials";

const migrateAll: Migration = {
  id: "migrate-all",
  kind: "migrate",
  target: "all",

  async run({ dryRun }) {
    console.log(
      `\n=========================================================\n\n` +
        `🏗️ MIGRATION → ALL\n` +
        `This will delete existing data and recreate everything.\n`
    );

    await deleteTestimonialContentType.run({ dryRun });

    await createTestimonialContentType.run({ dryRun });

    await importTestimonials.run({ dryRun });

    console.log(
      `\n\n🎉 Migration completed.\n` +
        `\n=========================================================\n`
    );
  },
};

export default migrateAll;
