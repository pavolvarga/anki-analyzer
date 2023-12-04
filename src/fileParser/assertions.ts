import { AnkiRecord } from '../types';

function containsHtml(text: string): boolean {
  const htmlRegex = /<(.*?)>/;
  return htmlRegex.test(text);
}

function assertHtmlIsNotUsed(record: AnkiRecord): void {
  const { card1, card2, id } = record;

  if (containsHtml(card1) || containsHtml(card2)) {
    throw new Error(`HTML is used in record '${id}' either in card1, card2 or both`);
  }
}

export function assertRecords(records: AnkiRecord[]): void {
  records.forEach((record: AnkiRecord) => {
    assertHtmlIsNotUsed(record);
  });
}
