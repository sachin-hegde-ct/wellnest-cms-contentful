/**
 * Standard structure of Contentful API structured errors.
 */
interface ContentfulStructuredError {
  status?: number;
  message?: string;
  details?: {
    errors?: Array<{
      name: string;
      value: string;
    }>;
    type?: string;
  };
}

/**
 * Pretty error formatter — handles both structured Contentful errors and generic errors.
 */
export const prettyError = (err: unknown, contentType: string): string => {
  if (!err) return "Unknown error.";

  const message = (err as Error).message;

  let parsed: ContentfulStructuredError | null = null;

  // Try to parse Contentful JSON errors
  try {
    parsed = JSON.parse(message) as ContentfulStructuredError;
  } catch {
    parsed = null;
  }

  // Handle structured Contentful errors
  if (parsed?.details) {
    if (Array.isArray(parsed.details.errors)) {
      const { name, value } = parsed.details.errors[0];

      switch (name) {
        case "unknownContentType":
          return `The content type '${contentType}' does not exist in this environment.`;

        case "invalidFilter":
          return "Invalid query: A filter or ordering is not applicable to this content type.";

        default:
          return `${name}: ${value}`;
      }
    }

    // Handle non-array structured errors
    switch (parsed.details.type) {
      case "Space":
        return "The specified Contentful Space could not be found.";
    }
  }

  // Fallback to generic error messages
  if (message.includes("ENOTFOUND"))
    return "Network error: Could not reach Contentful API.";

  if (message.includes("access token"))
    return "Authentication failed: Invalid or expired Contentful Management Token.";

  if (message.includes("NotFound"))
    return "Request failed: Resource not found. It may already be deleted.";

  if (message.includes("Validation"))
    return "Cannot delete content type because it is referenced by other content types.";

  return message.split("\n")[0];
};