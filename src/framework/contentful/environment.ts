import {
  Environment,
  Space,
  ClientAPI,
  createClient,
} from "contentful-management";
import { ENV } from "../env";

type ContentfulContext = {
  contentfulClient: ClientAPI;
  contentfulSpace: Space;
  contentfulEnvironment: Environment;
};

let cachedContext: ContentfulContext | null = null;

/**
 * Creates (if needed) and returns Contentful client, space and environment.
 * This method is safe to call multiple times.
 */
export async function getContentfulContext(): Promise<ContentfulContext> {
  if (cachedContext) {
    return cachedContext;
  }

  const {
    CONTENTFUL_MANAGEMENT_TOKEN,
    CONTENTFUL_SPACE_ID,
    CONTENTFUL_ENVIRONMENT = "master",
  } = process.env;

  if (!CONTENTFUL_MANAGEMENT_TOKEN) {
    throw new Error("Missing CONTENTFUL_MANAGEMENT_TOKEN");
  }

  if (!CONTENTFUL_SPACE_ID) {
    throw new Error("Missing CONTENTFUL_SPACE_ID");
  }

  const client = createClient({
    accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
  });

  const space = await client.getSpace(CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment(CONTENTFUL_ENVIRONMENT);

  cachedContext = {
    contentfulClient: client,
    contentfulSpace: space,
    contentfulEnvironment: environment,
  };

  return cachedContext;
}

export async function getEnvironmentInfo() {
  const { CONTENTFUL_SPACE_ID, CONTENTFUL_ENVIRONMENT } = ENV;

  return {
    spaceId: CONTENTFUL_SPACE_ID,
    environment: CONTENTFUL_ENVIRONMENT,
  };
}
