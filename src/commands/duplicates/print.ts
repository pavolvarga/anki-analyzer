import { sortBy } from 'lodash';
import { AnkiRecord } from '../../types';
import { createLimitMsg } from '../print';
import { DuplicatesCmdOptions } from './types';
import { sliceRecords } from '../common';

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

function printDuplicatesTable(
  duplicates: Map<string, AnkiRecord[]>,
  limit: number,
  cardNum: 1 | 2,
  deckName: string,
  omit: number | undefined,
) {
  if (duplicates.size === 0) {
    return;
  }

  const tableRows = Array.from(duplicates.entries()).map(([word, records]) => {
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
  const tableRowsSorted = sliceRecords(sortBy(tableRows, 'Word'), limit, omit);

  const limitMsg = createLimitMsg(limit, duplicates.size, omit);
  console.log(`\nShowing ${limitMsg} duplicated words in deck ${deckName} for card${cardNum}:`);
  console.table(tableRowsSorted);
}

export function printDetails(
  duplicates: [Map<string, AnkiRecord[]>, Map<string, AnkiRecord[]>],
  fullDeckName: string,
  options: DuplicatesCmdOptions,
) {
  const { limitRowCount: limit, cardType, omitRowCount: omit } = options;

  switch (cardType) {
    case 'card1': {
      printDuplicatesTable(duplicates[0], limit, 1, fullDeckName, omit);
      break;
    }
    case 'card2': {
      printDuplicatesTable(duplicates[1], limit, 2, fullDeckName, omit);
      break;
    }
    case 'both': {
      printDuplicatesTable(duplicates[0], limit, 1, fullDeckName, omit);
      printDuplicatesTable(duplicates[1], limit, 2, fullDeckName, omit);
      break;
    }
    default:
      throw new Error(`Unknown card type: ${cardType}`);
  }
}
