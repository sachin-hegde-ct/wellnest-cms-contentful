import fs from "fs/promises";
import { TESTIMONIAL_DATA_DIR } from "../../constants/data-dir";
import { getContentful } from "../../scripts/contentful";

export async function assignTestimonialPrograms() {
  const { contentfulEnvironment } = await getContentful();

  const testimonials = JSON.parse(
    await fs.readFile(TESTIMONIAL_DATA_DIR.SOURCE, "utf8")
  );

  const updated = [...testimonials];
  const programRefs: Record<string, any> = {};

  // GET TOTAL NUMBER OF PROGRAMS
  const meta = await contentfulEnvironment.getEntries({
    content_type: "program",
    limit: 0,
    skip: 0,
  });

  const total = meta.total;

  if (total === 0) {
    throw new Error("❌ No programs found in Contentful.");
  }

  for (let [index, testimonial] of updated.entries()) {
    const randomIndex = Math.floor(Math.random() * total);

    const res = await contentfulEnvironment.getEntries({
      content_type: "program",
      limit: 1,
      skip: randomIndex,
    });

    const randomProgram = res.items[0];
    const programId = randomProgram.sys.id;

    testimonial.relatedProgram = {
      sys: {
        type: "Link",
        linkType: "Entry",
        id: programId,
      },
    };

    programRefs[testimonial.name] = {
      programId,
      programTitle: randomProgram.fields.title["en-US"],
    };

    console.log(
      `   🔗 [${index + 1}/${updated.length}] Assigned Program "${
        randomProgram.fields.title["en-US"]
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

if (import.meta.url === `file://${process.argv[1]}`) {
  assignTestimonialPrograms();
}
