import { runMigration } from "contentful-migration";
import contentfulManagement from "contentful-management";
import { CONTENTFUL_ENVIRONMENT, CONTENTFUL_MANAGEMENT_TOKEN, CONTENTFUL_SPACE_ID, } from "./env.js";
/**
 * Pretty error formatter — handles both structured Contentful errors and generic errors.
 */
export const prettyError = (err, contentType) => {
    if (!err)
        return "Unknown error.";
    const message = err.message;
    let parsed = null;
    // Try to parse Contentful JSON errors
    try {
        parsed = JSON.parse(message);
    }
    catch {
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
/**
 * Deletes all entries of a content type, then deletes the content type schema.
 */
export const deleteContentType = async (contentTypeId) => {
    console.log(`\n---------------------------------------------------------\n\n` +
        `🗑️  Operation: Delete, Content Type: ${contentTypeId}\n`);
    try {
        const client = contentfulManagement.createClient({
            accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
        });
        const space = await client.getSpace(CONTENTFUL_SPACE_ID);
        const env = await space.getEnvironment(CONTENTFUL_ENVIRONMENT);
        //
        // 1. FETCH ENTRIES
        //
        let entries;
        try {
            entries = await env.getEntries({
                content_type: contentTypeId,
                limit: 1000,
            });
        }
        catch (err) {
            console.log(`    ❌ Error fetching entries: ${prettyError(err, contentTypeId)}\n` +
                `\n---------------------------------------------------------\n`);
            return;
        }
        const count = entries.items.length;
        if (count === 0) {
            console.log(`    ✅ No entries found.\n`);
        }
        else {
            console.log(`    ⚠️  Found ${count} entr${count === 1 ? "y" : "ies"}.\n`);
            console.log(`        ⏳ Preparing to remove entries…`);
            for (const entry of entries.items) {
                const id = entry.sys.id;
                try {
                    if (entry.isPublished && entry.isPublished()) {
                        console.log(`            • Unpublish: ${id}`);
                        await entry.unpublish();
                    }
                    console.log(`            • Delete: ${id}`);
                    await entry.delete();
                }
                catch (err) {
                    console.log(`            ❌ Failed to delete ${id}: ${prettyError(err, contentTypeId)}`);
                }
            }
            console.log(`\n        ✅ All entries removed from '${contentTypeId}'\n`);
        }
        //
        // 2. DELETE CONTENT TYPE SCHEMA
        //
        console.log(`    ⏳ Removing '${contentTypeId}' schema…\n`);
        try {
            await runMigration({
                spaceId: CONTENTFUL_SPACE_ID,
                environmentId: CONTENTFUL_ENVIRONMENT,
                accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
                yes: true,
                migrationFunction: (migration) => {
                    migration.deleteContentType(contentTypeId);
                },
            });
            console.log(`    🎉 Content type '${contentTypeId}' deleted successfully.\n` +
                `\n---------------------------------------------------------\n`);
        }
        catch (err) {
            console.log(`    ❌ Failed to delete schema: ${prettyError(err, contentTypeId)}\n` +
                `\n---------------------------------------------------------\n`);
        }
    }
    catch (outerErr) {
        console.log(`    ❌ Unexpected error: ${prettyError(outerErr, contentTypeId)}\n` +
            `\n---------------------------------------------------------\n`);
    }
};
