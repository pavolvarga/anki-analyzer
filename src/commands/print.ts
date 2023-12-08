import { CardType } from '../types';

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

export function createTagsMsg(tags: string[]): string {
  return tags.length > 0 ? 'tags: "' + tags.join(', ') + '"' : 'no tags';
}

export function createCardMsg(cardType: CardType): string {
  return cardType === 'both' ? 'for both cards' : `for ${cardType}`;
}

export function createPrefixMsg(prefix: string | undefined): string {
  return prefix ? ` (prefix used: '${prefix}')` : '';
}
