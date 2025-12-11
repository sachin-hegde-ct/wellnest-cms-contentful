import { deleteContentType } from "../../scripts/delete-content-type";
import { CONTENT_TYPES } from "../../constants/content-types";

export const deleteImageWrapperContentType = async () => {
  await deleteContentType(CONTENT_TYPES.IMAGE_WRAPPER);
};

if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    await deleteImageWrapperContentType();
  })();
}
