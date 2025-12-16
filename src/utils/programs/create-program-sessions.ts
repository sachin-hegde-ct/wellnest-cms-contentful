import fs from "fs/promises";
import { createEntry } from "../../scripts/create-entry";
import { CONTENT_TYPES } from "../../constants/content-types";
import { PROGRAM_DATA_DIR } from "../../constants/data-dir";

export async function createProgramSessions() {
  const programs = JSON.parse(
    await fs.readFile(PROGRAM_DATA_DIR.FINAL, "utf8")
  );

  const updated = [...programs];
  const sessionsMap: Record<string, any[]> = {};

  for (let [pIndex, program] of updated.entries()) {
    const sessions = program.sessions || [];
    sessionsMap[program.slug] = [];

    console.log(
      `\n   [${pIndex + 1}/${updated.length}] Creating sessions for Program: ${
        program.title
      }\n`
    );

    const sessionLinks: any[] = [];

    for (let [sIndex, session] of sessions.entries()) {
      console.log(
        `     ➕ [${sIndex + 1}/${sessions.length}] Creating ProgramSession: ${
          session.title
        }\n`
      );

      const entry = await createEntry(CONTENT_TYPES.PROGRAM_SESSION, {
        title: { "en-US": session.title },
        sessionDate: { "en-US": session.sessionDate },
        videoUrl: { "en-US": session.videoUrl },
        notes: { "en-US": session.notes },
      });

      const link = {
        sys: { type: "Link", linkType: "Entry", id: entry.sys.id },
      };
      sessionLinks.push(link);

      sessionsMap[program.slug].push({
        sessionIndex: sIndex,
        sessionTitle: session.title,
        sessionId: entry.sys.id,
      });

      console.log(`       ✔️ Created ProgramSession entry: ${session.title}\n`);
    }

    // Replace program.sessions with array of links
    updated[pIndex].sessions = sessionLinks;
  }

  // persist updated programs and sessions map
  await fs.writeFile(PROGRAM_DATA_DIR.FINAL, JSON.stringify(updated, null, 2));
  await fs.writeFile(
    PROGRAM_DATA_DIR.SESSIONS_MAP,
    JSON.stringify(sessionsMap, null, 2)
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  createProgramSessions();
}
