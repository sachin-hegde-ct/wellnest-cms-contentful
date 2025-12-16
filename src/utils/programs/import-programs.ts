import fs from "fs/promises";
import { createEntry } from "../../scripts/create-entry";
import { CONTENT_TYPES } from "../../constants/content-types";
import { PROGRAM_DATA_DIR } from "../../constants/data-dir";

export async function importPrograms() {
  const programs = JSON.parse(
    await fs.readFile(PROGRAM_DATA_DIR.FINAL, "utf8")
  );

  for (const [index, program] of programs.entries()) {
    const entry = await createEntry(CONTENT_TYPES.PROGRAM, {
      title: { "en-US": program.title },
      slug: { "en-US": program.slug },
      summary: { "en-US": program.summary },
      description: { "en-US": program.description },
      difficultyLevel: { "en-US": program.difficultyLevel },
      durationWeeks: { "en-US": program.durationWeeks },
      isFeatured: { "en-US": program.isFeatured },
      startDate: { "en-US": program.startDate },
      bannerImage: { "en-US": program.bannerImage },
      coach: { "en-US": program.coach },
      sessions: { "en-US": program.sessions },
    });

    // Store the sys.id inside final JSON (good for deletion)
    program.sys = {
      id: entry.sys.id,
      type: "Entry",
      linkType: "Entry",
    };

    console.log(
      `   📝 [${index + 1}/${programs.length}] Created Program entry: ${
        program.title
      }\n`
    );
  }

  await fs.writeFile(PROGRAM_DATA_DIR.FINAL, JSON.stringify(programs, null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  importPrograms();
}
