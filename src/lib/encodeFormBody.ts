export function encodeFormBody(data: Record<string, string>): string {
  return new URLSearchParams(data).toString().replace(/\+/g, "%20");
}
