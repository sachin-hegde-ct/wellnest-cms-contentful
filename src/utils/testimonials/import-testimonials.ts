import fs from "fs/promises";
import { createEntry } from "../../scripts/create-entry";
import { CONTENT_TYPES } from "../../constants/content-types";
import { TESTIMONIAL_DATA_DIR } from "../../constants/data-dir";

export async function importTestimonials() {
  const testimonials = JSON.parse(
    await fs.readFile(TESTIMONIAL_DATA_DIR.FINAL, "utf8")
  );

  for (const [index, t] of testimonials.entries()) {
    const entry = await createEntry(CONTENT_TYPES.TESTIMONIAL, {
      name: { "en-US": t.name },
      quote: { "en-US": t.quote },
      rating: { "en-US": t.rating },
      isApproved: { "en-US": t.isApproved },
      date: { "en-US": t.date },
      relatedProgram: { "en-US": t.relatedProgram },
    });

    t.sys = {
      id: entry.sys.id,
      type: "Entry",
      linkType: "Entry",
    };

    console.log(
      `   📝 [${index + 1}/${testimonials.length}] Created Testimonial entry: ${
        t.name
      }\n`
    );
  }

  await fs.writeFile(
    TESTIMONIAL_DATA_DIR.FINAL,
    JSON.stringify(testimonials, null, 2)
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  importTestimonials();
}
