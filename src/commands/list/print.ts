import { sortBy } from 'lodash';
import { AnkiRecord, CardType } from '../../types';
import { createLimitMsg } from '../print';
import { ListCmdOptions, ListResult } from './types';

function printTable(
  records: AnkiRecord[],
  deckName: string,
  tags: string[],
  limit: number,
  cardType: CardType,
  operationName: string,
): void {
  const tagsMsg = tags.length > 0 ? 'tags: "' + tags.join(', ') + '"' : 'no tags';
  const cardMsg = cardType === 'both' ? 'for both cards' : `for ${cardType}`;

  if (records.length === 0) {
    console.log(`Deck ${deckName} using ${tagsMsg} ${cardMsg} has no records with ${operationName}`);
    return;
  }

  const limitMsg = createLimitMsg(records.length, limit);
  console.log(`Showing ${limitMsg} records in deck ${deckName} using ${tagsMsg} ${cardMsg} with ${operationName}:`);

  // select sorting
  const sort = cardType === 'card1' || cardType === 'both' ? 'card1' : 'card2';

  console.table(sortBy(records, sort).slice(0, limit));
}

export function printListResult(result: ListResult, deckName: string, options: ListCmdOptions): void {
  const { tags, limitRowCount, operations, cardType } = options;

  if (operations.includes('--list-cards-with-meaning-separator')) {
    printTable(result.recordsByMeaningSeparator!, deckName, tags ?? [], limitRowCount, cardType, 'Meaning Separator');
  }
  if (operations.includes('--list-cards-with-synonym-separator')) {
    printTable(result.recordsBySynonymSeparator!, deckName, tags ?? [], limitRowCount, cardType, 'Synonym Separator');
  }
  if (operations.includes('--list-cards-with-explanation-brackets')) {
    printTable(
      result.recordsByExplanationBrackets!,
      deckName,
      tags ?? [],
      limitRowCount,
      cardType,
      'Explanation Brackets',
    );
  }
}
