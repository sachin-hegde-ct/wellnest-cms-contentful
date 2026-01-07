/* eslint-disable @typescript-eslint/no-explicit-any */
import { PROGRAM_DATA_DIR } from "../../config/data-dir";

import { createProgramImage } from "./image";
import { assignRandomProgramCoach } from "./assign-coach";
import { createProgramEntry } from "./create-entry";
import { createProgramSessions } from "./create-sessions";
import { readDataFile } from "../../../framework/fs/read-data-file";
import { writeDataFile } from "../../../framework/fs/write-data-file";

export async function importPrograms({ dryRun }: { dryRun: boolean }) {
  const sourcePrograms = await readDataFile<any[]>(PROGRAM_DATA_DIR.SOURCE);

  if (!sourcePrograms || sourcePrograms.length === 0) {
    console.log(
      `\n⚠️  No source programs found at ${PROGRAM_DATA_DIR.SOURCE}\n`,
    );
    return;
  }

  const finalPrograms: any[] = [];
  const imageMap: Record<string, any> = {};
  const sessionsMap: Record<string, any> = {};

  for (let index = 0; index < sourcePrograms.length; index++) {
    const program = sourcePrograms[index];

    console.log(
      `\n   📘 [${index + 1}/${sourcePrograms.length}] ${program.title}`,
    );

    /* -------------------------------------------------
     * 1. Image
     * ------------------------------------------------- */
    let image: any = null;

    if (dryRun) {
      console.log(`       🖼️  [DRY RUN] Would create ImageWrapper entry`);
    } else {
      image = await createProgramImage(program, index);
      imageMap[program.slug] = {
        assetId: image.assetId,
        imageWrapperId: image.imageWrapperId,
      };
    }

    /* -------------------------------------------------
     * 2. Coach
     * ------------------------------------------------- */
    let coach: any = null;

    if (!dryRun) {
      coach = await assignRandomProgramCoach();
    }

    /* -------------------------------------------------
     * 3. Program sessions
     * ------------------------------------------------- */
    let sessionIds: string[] = [];
    let sessionLink: any = null;

    if (dryRun) {
      console.log(
        `       📅 [DRY RUN] Would create program sessions and link them`,
      );
    } else {
      const sessions = await createProgramSessions(program);
      sessionIds = sessions.sessionIds;
      sessionLink = sessions.sessionLink;

      sessionsMap[program.slug] = sessionIds;
    }

    /* -------------------------------------------------
     * 4. Program entry
     * ------------------------------------------------- */
    let programId: string | null = null;

    if (dryRun) {
      console.log(
        `       📘 [DRY RUN] Would create Program entry linked to image, coach, and sessions`,
      );
    } else {
      programId = await createProgramEntry(
        program,
        image.imageLink,
        coach.coachLink,
        sessionLink,
      );

      program.sys = {
        id: programId,
        type: "Entry",
        linkType: "Entry",
      };

      finalPrograms.push(program);
    }

    /* -------------------------------------------------
     * 5. Persist state
     * ------------------------------------------------- */
    await writeDataFile(PROGRAM_DATA_DIR.FINAL, finalPrograms, { dryRun });
    await writeDataFile(PROGRAM_DATA_DIR.IMAGES_MAP, imageMap, { dryRun });
    await writeDataFile(PROGRAM_DATA_DIR.SESSIONS_MAP, sessionsMap, { dryRun });

    console.log(
      dryRun
        ? `   🟡 Dry run completed for program`
        : `   ✅ Program imported successfully`,
    );
  }

  console.log(
    dryRun
      ? `\n🧪 Dry run completed. No data was written.\n`
      : `\n🎉 All programs imported successfully.\n`,
  );
}
