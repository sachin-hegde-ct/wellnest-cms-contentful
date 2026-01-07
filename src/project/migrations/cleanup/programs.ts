/* eslint-disable @typescript-eslint/no-explicit-any */

import { Migration } from "../../../framework/types/migration";
import { contentTypeExists } from "../../../framework/contentful/content-type-check";
import { deleteEntryById } from "../../../framework/contentful/delete-entry";
import { deleteAssetById } from "../../../framework/contentful/delete-asset";
import { deleteDataFile } from "../../../framework/fs/delete-data-file";
import { PROGRAM_DATA_DIR } from "../../config/data-dir";
import { CONTENT_TYPES } from "../../config/content-types";
import { readDataFile } from "../../../framework/fs/read-data-file";
import { runStandaloneIfInvoked } from "../../../framework/cli/run-standalone";

const cleanupPrograms: Migration = {
  id: "cleanup-entry-programs",
  kind: "cleanup",
  target: CONTENT_TYPES.PROGRAM,

  async run({ dryRun }) {
    console.log("\n" + "-".repeat(60) + "\n");
    console.log(`\n🧤 Cleanup → Programs\n`);

    // ------------------------------------------------------
    // 1️⃣ PREFLIGHT
    // ------------------------------------------------------

    const exists = await contentTypeExists(CONTENT_TYPES.PROGRAM);

    if (!exists) {
      console.log(
        `ℹ️  Content type '${CONTENT_TYPES.PROGRAM}' does not exist.\n`,
      );
      console.log("\n" + "-".repeat(60) + "\n");
      return;
    }

    // ------------------------------------------------------
    // 2️⃣ LOAD STATE FILES
    // ------------------------------------------------------
    const programs = await readDataFile<any[]>(PROGRAM_DATA_DIR.FINAL);

    if (!programs) {
      console.log("\n" + "-".repeat(60) + "\n");
      return;
    }

    const imageMap = await readDataFile<Record<string, any>>(
      PROGRAM_DATA_DIR.IMAGES_MAP,
    );

    const sessionMap = await readDataFile<Record<string, string[]>>(
      PROGRAM_DATA_DIR.SESSIONS_MAP,
    );

    // ------------------------------------------------------
    // 3️⃣ STREAM CLEANUP (ONE PROGRAM AT A TIME)
    // ------------------------------------------------------

    const total = programs.length;

    for (let index = 0; index < total; index++) {
      const program = programs[index];
      const programKey = program.slug ?? program.title;

      const imageInfo = imageMap?.[programKey];
      const sessions = sessionMap?.[programKey] ?? [];

      console.log(
        `\n [${index + 1}/${total}] 🧹 Removing Program: ${program.title}\n`,
      );

      // -------------------------
      // Program sessions
      // -------------------------
      for (const sessionId of sessions) {
        if (dryRun) {
          console.log(`   [dry-run] Would delete ProgramSession ${sessionId}`);
        } else {
          await deleteEntryById(sessionId);
        }
      }

      // -------------------------
      // Program entry
      // -------------------------
      if (program?.sys?.id) {
        if (dryRun) {
          console.log(`   [dry-run] Would delete Program ${program.sys.id}`);
        } else {
          await deleteEntryById(program.sys.id);
        }
      }

      // -------------------------
      // ImageWrapper entry
      // -------------------------
      if (imageInfo?.imageWrapperId) {
        if (dryRun) {
          console.log(
            `   [dry-run] Would delete ImageWrapper ${imageInfo.imageWrapperId}`,
          );
        } else {
          await deleteEntryById(imageInfo.imageWrapperId);
        }
      }

      // -------------------------
      // Asset
      // -------------------------
      if (imageInfo?.assetId) {
        if (dryRun) {
          console.log(`   [dry-run] Would delete Asset ${imageInfo.assetId}`);
        } else {
          await deleteAssetById(imageInfo.assetId);
        }
      }
    }

    // ------------------------------------------------------
    // 4️⃣ CLEAN LOCAL STATE
    // ------------------------------------------------------

    await deleteDataFile(PROGRAM_DATA_DIR.FINAL, dryRun);
    await deleteDataFile(PROGRAM_DATA_DIR.IMAGES_MAP, dryRun);
    await deleteDataFile(PROGRAM_DATA_DIR.SESSIONS_MAP, dryRun);

    if (dryRun) {
      console.log(
        `\n\n🧪 Dry run summary: ${total} program(s) would be deleted.\n`,
      );
    } else {
      console.log(`\n\n🎉 Cleanup completed for Programs.\n`);
    }
    console.log("\n" + "-".repeat(60) + "\n");
  },
};

export default cleanupPrograms;

/* ------------------------------------------------------------------ */
/* Standalone execution                                               */
/* ------------------------------------------------------------------ */
runStandaloneIfInvoked(cleanupPrograms);
