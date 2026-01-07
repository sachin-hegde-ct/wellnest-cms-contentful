// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNotFoundError(err: any): boolean {
  return err?.name === "NotFound";
}
