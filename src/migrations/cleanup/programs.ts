import fs from "fs/promises";
import { deleteEntryById } from "../../scripts/delete-entry";
import { deleteAssetById } from "../../scripts/delete-asset";
import { PROGRAM_DATA_DIR } from "../../constants/data-dir";

export const cleanupPrograms = async () => {
  console.log(
    `\n---------------------------------------------------------\n\n` +
      `🧤 Operation: Cleanup, Entry: Program\n`
  );

  const finalJsonPath = PROGRAM_DATA_DIR.FINAL;
  const imagesMapPath = PROGRAM_DATA_DIR.IMAGES_MAP;
  const coachMapPath = PROGRAM_DATA_DIR.COACHES_MAP;
  const sessionsMapPath = PROGRAM_DATA_DIR.SESSIONS_MAP;

  let finalPrograms: any[] = [];
  let imagesMap: Record<string, any> = {};
  let coachMap: Record<string, any> = {};
  let sessionsMap: Record<string, any> = {};

  // ---------- Read JSON files safely ----------
  try {
    finalPrograms = JSON.parse(await fs.readFile(finalJsonPath, "utf8"));
  } catch {
    console.log(`   ⚠️  No ${finalJsonPath} found. Skipping entry cleanup.\n`);
  }

  try {
    imagesMap = JSON.parse(await fs.readFile(imagesMapPath, "utf8"));
  } catch {
    console.log(`   ⚠️  No ${imagesMapPath} found. Skipping image cleanup.\n`);
  }

  try {
    coachMap = JSON.parse(await fs.readFile(coachMapPath, "utf8"));
  } catch {
    console.log(
      `   ⚠️  No ${coachMapPath} found. Skipping coach map cleanup.\n`
    );
  }

  try {
    sessionsMap = JSON.parse(await fs.readFile(sessionsMapPath, "utf8"));
  } catch {
    console.log(
      `   ⚠️  No ${sessionsMapPath} found. Skipping sessions cleanup.\n`
    );
  }

  // ---------- Remove all related content ----------
  for (const [index, program] of finalPrograms.entries()) {
    const slug = program.slug;

    console.log(
      `\n [${index + 1}/${finalPrograms.length}]🧹 Removing Program: ${
        program.title
      }\n`
    );

    const imageInfo = imagesMap?.[slug];
    const sessionRefs = sessionsMap?.[slug];
    const programEntryId = program?.sys?.id;

    // 1. Delete Program entry
    if (programEntryId) {
      await deleteEntryById(programEntryId);
    }

    // 2. Delete assigned Coach reference? No — coaches are reused. Skip deleting coach.

    // 3. Delete Program Session entries
    if (Array.isArray(sessionRefs)) {
      for (const sessionId of sessionRefs) {
        await deleteEntryById(sessionId);
      }
    }

    // 4. Delete Banner ImageWrapper entry
    if (imageInfo?.imageWrapperId) {
      await deleteEntryById(imageInfo.imageWrapperId);
    }

    // 5. Delete Asset
    if (imageInfo?.assetId) {
      await deleteAssetById(imageInfo.assetId);
    }
  }

  // ---------- Delete JSON files ----------
  async function safeDelete(filePath: string) {
    try {
      await fs.unlink(filePath);
    } catch (err: any) {
      if (err.code === "ENOENT") {
        console.log(`   ⚠️  File not found, skipping: ${filePath}`);
      } else {
        console.log(`   ❌ Could not delete ${filePath}: ${err.message}`);
      }
    }
  }

  await safeDelete(finalJsonPath);
  await safeDelete(imagesMapPath);
  await safeDelete(coachMapPath);
  await safeDelete(sessionsMapPath);

  console.log(
    `\n\n🎉 Program entries cleaned up successfully.\n` +
      `\n---------------------------------------------------------\n`
  );
};

// Auto-run when executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  cleanupPrograms();
}
