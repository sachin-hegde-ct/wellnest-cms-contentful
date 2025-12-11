import { deleteContentType } from "../../scripts/delete-content-type";
import { CONTENT_TYPES } from "../../constants/content-types";

export const deleteSocialLinksContentType = async () => {
  await deleteContentType(CONTENT_TYPES.SOCIAL_LINKS);
};

if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    await deleteSocialLinksContentType();
  })();
}
