import { AnkiRecord } from '../../types';
import { DuplicateCmdOptions } from './types';

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

function printDuplicatesTable(duplicates: Map<string, AnkiRecord[]>, limit: number, cardNum: 1 | 2, deckName: string) {
  if (duplicates.size === 0) {
    return;
  }

  const tableRows = Array.from(duplicates.entries())
    .slice(0, limit)
    .map(([word, records]) => {
      const row = { Word: word };
      records.forEach((record, idx) => {
        // @ts-ignore
        row[`Dupl.${idx + 1} ID`] = record.id;
        // @ts-ignore
        row[`Dupl.${idx + 1} Card 1`] = record.card1;
        // @ts-ignore
        row[`Dupl.${idx + 1} Card 2`] = record.card2;
      });
      return row;
    });

  console.log(
    `\nShowing first ${limit} of ${duplicates.size} duplicated words in deck ${deckName} for card${cardNum}:`,
  );
  console.table(tableRows);
}

export function printDetails(
  duplicates: [Map<string, AnkiRecord[]>, Map<string, AnkiRecord[]>],
  fullDeckName: string,
  options: DuplicateCmdOptions,
) {
  const { maxRowCount, cardType } = options;

  switch (cardType) {
    case 'card1': {
      printDuplicatesTable(duplicates[0], maxRowCount, 1, fullDeckName);
      break;
    }
    case 'card2': {
      printDuplicatesTable(duplicates[1], maxRowCount, 2, fullDeckName);
      break;
    }
    case 'both': {
      printDuplicatesTable(duplicates[0], maxRowCount, 1, fullDeckName);
      printDuplicatesTable(duplicates[1], maxRowCount, 2, fullDeckName);
      break;
    }
    default:
      throw new Error(`Unknown card type: ${cardType}`);
  }
}
