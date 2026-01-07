/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEntry } from "../../../framework/contentful/create-entry";
import { CONTENT_TYPES } from "../../config/content-types";

export async function createProgramSessions(program: any) {
  const sessionIds: string[] = [];

  for (const session of program.sessions ?? []) {
    const entry = await createEntry(CONTENT_TYPES.PROGRAM_SESSION, {
      title: { "en-US": session.title },
      sessionDate: { "en-US": session.sessionDate },
      videoUrl: { "en-US": session.videoUrl },
      notes: { "en-US": session.notes },
    });

    sessionIds.push(entry.sys.id);
  }

  return {
    sessionIds,
    sessionLink: sessionIds.map((sessionId) => ({
      sys: {
        type: "Link",
        linkType: "Entry",
        id: sessionId,
      },
    })),
  };
}
