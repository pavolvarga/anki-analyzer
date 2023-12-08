import { AnkiRecord } from '../../types';
import { createCardMsg, createLimitMsg, createTagsMsg } from '../print';
import { sliceRecords, sortRecords } from '../common';
import { ListCmdOptions, ListResult } from './types';

function printTable(records: AnkiRecord[], deckName: string, operationName: string, options: ListCmdOptions): void {
  const { limitRowCount: limit, omitRowCount: omit, cardType } = options;
  const tags = options.tags ?? [];
  const tagsMsg = createTagsMsg(tags);
  const cardMsg = createCardMsg(cardType);

  if (records.length === 0) {
    console.log(`Deck ${deckName} using ${tagsMsg} ${cardMsg} has no records with ${operationName}`);
    return;
  }

  const limitMsg = createLimitMsg(limit, records.length, omit);
  console.log(`Showing ${limitMsg} records in deck ${deckName} using ${tagsMsg} ${cardMsg} with ${operationName}:`);

  console.table(sliceRecords(sortRecords(records, cardType), limit, omit));
}

export function printListResult(result: ListResult, deckName: string, options: ListCmdOptions): void {
  const { operations } = options;

  if (operations.includes('--list-cards-with-meaning-separator')) {
    printTable(result.recordsByMeaningSeparator!, deckName, 'Meaning Separator', options);
  }
  if (operations.includes('--list-cards-with-synonym-separator')) {
    printTable(result.recordsBySynonymSeparator!, deckName, 'Synonym Separator', options);
  }
  if (operations.includes('--list-cards-with-explanation-brackets')) {
    printTable(result.recordsByExplanationBrackets!, deckName, 'Explanation Brackets', options);
  }
  if (operations.includes('--list-cards-with-prefix-separator')) {
    printTable(result.recordsByPrefixSeparator!, deckName, 'Prefix Separator', options);
  }
}
