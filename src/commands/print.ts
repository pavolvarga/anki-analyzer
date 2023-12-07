export function createLimitMsg(limit: number, total: number, omit: number | undefined): string {
  if (omit === undefined) {
    if (limit >= total) {
      return `${total} of ${total}`;
    }
    return `first ${limit} of ${total}`;
  }

  if (limit + omit >= total) {
    return `last ${limit} of ${total}`;
  }
  return `${limit} of ${total} [ommited first ${omit}]`;
}
