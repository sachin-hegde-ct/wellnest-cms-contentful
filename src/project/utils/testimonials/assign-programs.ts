import fs from "fs/promises";
import { TESTIMONIAL_DATA_DIR } from "../../config/data-dir";
import { getContentfulContext } from "../../../framework/contentful/environment";

export async function assignProgramsToTestimonials() {
  const { contentfulEnvironment } = await getContentfulContext();

  const testimonials = JSON.parse(
    await fs.readFile(TESTIMONIAL_DATA_DIR.SOURCE, "utf8")
  );

  const updated = [...testimonials];
  const programRefs: Record<string, any> = {};

  // Fetch total programs count
  const meta = await contentfulEnvironment.getEntries({
    content_type: "program",
    limit: 0,
  });

  const total = meta.total;

  if (total === 0) {
    throw new Error("❌ No programs found in Contentful.");
  }

  for (const [index, testimonial] of updated.entries()) {
    const randomIndex = Math.floor(Math.random() * total);

    const res = await contentfulEnvironment.getEntries({
      content_type: "program",
      limit: 1,
      skip: randomIndex,
    });

    const program = res.items[0];

    testimonial.relatedProgram = {
      sys: {
        type: "Link",
        linkType: "Entry",
        id: program.sys.id,
      },
    };

    programRefs[testimonial.name] = {
      programId: program.sys.id,
      programTitle: program.fields.title["en-US"],
    };

    console.log(
      `   🔗 [${index + 1}/${updated.length}] Assigned Program "${
        program.fields.title["en-US"]
      }" → Testimonial: ${testimonial.name}\n`
    );
  }

  await fs.writeFile(
    TESTIMONIAL_DATA_DIR.FINAL,
    JSON.stringify(updated, null, 2)
  );

  await fs.writeFile(
    TESTIMONIAL_DATA_DIR.PROGRAM_MAP,
    JSON.stringify(programRefs, null, 2)
  );
}
