import fs from "fs/promises";
import { PROGRAM_DATA_DIR } from "../../constants/data-dir";
import { getContentful } from "../../scripts/contentful";

export async function assignProgramCoaches() {
  const { contentfulEnvironment } = await getContentful();

  const programs = JSON.parse(
    await fs.readFile(PROGRAM_DATA_DIR.FINAL, "utf8")
  );

  const updated = [...programs];
  const coachRefs: Record<string, any> = {};

  // GET TOTAL NUMBER OF COACHES
  const meta = await contentfulEnvironment.getEntries({
    content_type: "coach",
    limit: 0,
    skip: 0,
  });

  const total = meta.total;

  if (total === 0) {
    throw new Error("❌ No coaches found in Contentful.");
  }

  for (let [index, program] of updated.entries()) {
    const randomIndex = Math.floor(Math.random() * total);

    const res = await contentfulEnvironment.getEntries({
      content_type: "coach",
      limit: 1,
      skip: randomIndex,
    });

    const randomCoach = res.items[0];
    const coachId = randomCoach.sys.id;

    program.coach = {
      sys: {
        type: "Link",
        linkType: "Entry",
        id: coachId,
      },
    };

    coachRefs[program.slug] = {
      coachId,
    };

    console.log(
      `   👤 [${index + 1}/${updated.length}] Assigned coach ${
        randomCoach.fields.name["en-US"]
      } → ${program.title}\n`
    );
  }

  await fs.writeFile(PROGRAM_DATA_DIR.FINAL, JSON.stringify(updated, null, 2));
  await fs.writeFile(
    PROGRAM_DATA_DIR.COACHES_MAP,
    JSON.stringify(coachRefs, null, 2)
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  assignProgramCoaches();
}
