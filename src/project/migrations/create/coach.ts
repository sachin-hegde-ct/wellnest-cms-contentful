import { Migration } from "../../../framework/types/migration";

const createCoach: Migration = {
  id: "create-content-type-coach",
  kind: "create",
  target: "coach",

  async run() {
    console.log("Creating Coach content type...");
  },
};

export default createCoach;
