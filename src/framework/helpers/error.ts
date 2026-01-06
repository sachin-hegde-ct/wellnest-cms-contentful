export function isNotFoundError(err: any): boolean {
  return err?.name === "NotFound";
}
