import { AnkiRecord } from '../../types';

function createStatusMessage(name: string, tags: string[], size: number, cardNum: 1 | 2): string {
  const tagsMsg = tags.length > 0 ? 'tags: "' + tags.join(', ') + '"' : 'no tags';
  if (size === 0) {
    return `In deck ${name} using ${tagsMsg} for card${cardNum} exists no duplicated words`;
  }
  return `In deck ${name} using ${tagsMsg} for card${cardNum} exists ${size} duplicated words`;
}

export function printStatus(
  duplicates: [Map<string, AnkiRecord[]>, Map<string, AnkiRecord[]>],
  fullDeckName: string,
  tags?: string[],
): void {
  const [duplicates1, duplicates2] = duplicates;

  console.log(createStatusMessage(fullDeckName, tags || [], duplicates1.size, 1));
  console.log(createStatusMessage(fullDeckName, tags || [], duplicates2.size, 2));
}
