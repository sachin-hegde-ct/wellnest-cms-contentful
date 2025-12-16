import { CONTENT_TYPES } from "../../constants/content-types";
import { deleteContentType } from "../../scripts/delete-content-type";

export const deleteProgramSessionContentType = async () => {
  await deleteContentType(CONTENT_TYPES.PROGRAM_SESSION);
};

// Execute ONLY when run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    await deleteProgramSessionContentType();
  })();
}
