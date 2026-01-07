import { getEntries } from "../../../framework/contentful/get-entries";

export async function assignRandomProgram() {
  const meta = await getEntries({
    content_type: "program",
    limit: 0,
  });

  if (meta.total === 0) {
    throw new Error("❌ No programs found in Contentful.");
  }

  const randomIndex = Math.floor(Math.random() * meta.total);

  const res = await getEntries({
    content_type: "program",
    limit: 1,
    skip: randomIndex,
  });

  const program = res.items[0];

  return {
    programId: program.sys.id,
    programLink: {
      sys: {
        type: "Link",
        linkType: "Entry",
        id: program.sys.id,
      },
    },
  };
}
