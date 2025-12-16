import { uploadProgramImages } from "../../utils/programs/upload-program-images";
import { assignProgramCoaches } from "../../utils/programs/assign-program-coaches";
import { createProgramSessions } from "../../utils/programs/create-program-sessions";
import { importPrograms } from "../../utils/programs/import-programs";

export const runProgramDataImport = async () => {
  console.log(
    `\n---------------------------------------------------------\n\n` +
      `🚀 Operation: Import, Entry: Program\n`
  );

  try {
    console.log(`\n 🔹 Uploading images & creating Banner Image entries...\n`);
    await uploadProgramImages();
    console.log(
      `\n   ✅ Uploading images & creating Banner Image entries COMPLETED. \n`
    );
  } catch (err) {
    console.error(
      `❌ Uploading images & creating Banner Image entries FAILED: ${
        (err as Error).message
      }`
    );
    process.exit(1);
  }

  try {
    console.log(`\n 🔹 Assigning Coaches to programs...\n`);
    await assignProgramCoaches();
    console.log(`\n   ✅ Assigning Coaches to programs COMPLETED.\n`);
  } catch (err) {
    console.error(
      `❌ Assigning Coaches to programs FAILED: ${(err as Error).message}`
    );
    process.exit(1);
  }

  try {
    console.log(`\n 🔹 Creating Program Session entries...\n`);
    await createProgramSessions();
    console.log(`\n   ✅ Creating Program Session entries COMPLETED.\n`);
  } catch (err) {
    console.error(
      `\n ❌ Creating Program Session entries FAILED: ${(err as Error).message}`
    );
    process.exit(1);
  }

  try {
    console.log(`\n 🔹 Creating Program entries...\n`);
    await importPrograms();
    console.log(`\n   ✅ Creating Program entries COMPLETED.\n`);
  } catch (err) {
    console.error(
      `\n ❌ Creating Program entries FAILED: ${(err as Error).message}`
    );
    process.exit(1);
  }

  console.log(
    `\n🎉 Program entries imported successfully.\n` +
      `\n---------------------------------------------------------\n`
  );
};

// ------------------------------------------------------------------
// AUTO-EXECUTE WHEN RUN DIRECTLY
// ------------------------------------------------------------------
if (import.meta.url === `file://${process.argv[1]}`) {
  runProgramDataImport();
}
