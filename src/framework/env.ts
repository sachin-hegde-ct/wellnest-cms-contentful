import "dotenv/config";

/**
 * Centralized environment variable access.
 * This file is imported ONCE at CLI startup.
 */

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    const message = `❌ Missing required environment variable: ${key}`;
    throw new Error(message);
  }
  return value;
}

export const ENV = {
  CONTENTFUL_MANAGEMENT_TOKEN: requireEnv("CONTENTFUL_MANAGEMENT_TOKEN"),
  CONTENTFUL_SPACE_ID: requireEnv("CONTENTFUL_SPACE_ID"),
  CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT ?? "master",
};
