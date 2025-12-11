import contentfulManagement, {
  Space,
  Environment,
  ClientAPI,
} from "contentful-management";
import {
  CONTENTFUL_MANAGEMENT_TOKEN,
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT,
} from "./env";

/**
 * Cached instances to ensure all migration/import scripts
 * reuse the same client, space, and environment.
 */
let cachedClient: ClientAPI | null = null;
let cachedSpace: Space | null = null;
let cachedEnvironment: Environment | null = null;

/**
 * Initializes and caches the Contentful Client, Space, and Environment.
 */
export async function getContentful() {
  if (cachedClient && cachedSpace && cachedEnvironment) {
    return {
      contentfulClient: cachedClient,
      contentfulSpace: cachedSpace,
      contentfulEnvironment: cachedEnvironment,
    };
  }

  // Create client
  cachedClient = contentfulManagement.createClient({
    accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
  });

  // Load space
  cachedSpace = await cachedClient.getSpace(CONTENTFUL_SPACE_ID);

  // Load environment
  cachedEnvironment = await cachedSpace.getEnvironment(CONTENTFUL_ENVIRONMENT);

  return {
    contentfulClient: cachedClient,
    contentfulSpace: cachedSpace,
    contentfulEnvironment: cachedEnvironment,
  };
}
