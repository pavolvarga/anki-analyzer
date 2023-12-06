export function createLimitMsg(limit: number, total: number): string {
  if (limit >= total) {
    return `showing ${total} of ${total}`;
  }
  return `showing first ${limit} of ${total}`;
}
