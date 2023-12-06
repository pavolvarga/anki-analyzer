import { AnkiRecord } from '../../types';

/**
 * Split a card into words and return a map of words to records.
 */
function createWordMap(records: AnkiRecord[], cardNum: 1 | 2, synonymSeparator: string): Map<string, AnkiRecord[]> {
  return records.reduce((acc, record) => {
    const card = cardNum === 1 ? record.card1 : record.card2;
    const words = card.split(synonymSeparator).map((word) => word.trim());

    words.forEach((word) => {
      if (!acc.has(word)) {
        acc.set(word, [record]);
      } else {
        acc.get(word)!.push(record);
      }
    });

    return acc;
  }, new Map<string, AnkiRecord[]>());
}

/**
 * Remove entries for words that only have one record.
 */
function removeNonDuplicates(wordMap: Map<string, AnkiRecord[]>): Map<string, AnkiRecord[]> {
  return Array.from(wordMap.entries()).reduce((acc, [word, records]) => {
    if (records.length > 1) {
      acc.set(word, records);
    }
    return acc;
  }, new Map<string, AnkiRecord[]>());
}

/**
 * Create a tuple of maps of words to records for each card type.
 * The first map is for card 1, the second map is for card 2.
 * The maps only contain entries for words that have duplicates.
 */
export function findDuplicatesInCardWords(
  records: AnkiRecord[],
  synonymSeparator: string,
): [Map<string, AnkiRecord[]>, Map<string, AnkiRecord[]>] {
  const wordMap1 = createWordMap(records, 1, synonymSeparator);
  const wordMap2 = createWordMap(records, 2, synonymSeparator);

  const duplicates1 = removeNonDuplicates(wordMap1);
  const duplicates2 = removeNonDuplicates(wordMap2);

  return [duplicates1, duplicates2];
}
