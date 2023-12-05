import { AnkiRecord, CardType } from '../../types';
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
  const cardMsg = cardType === 'both' ? 'for both cards' : `for card ${cardType}`;

  if (records.length === 0) {
    console.log(`Deck ${deckName} using ${tagsMsg} ${cardMsg} has no records with ${operationName}`);
    return;
  }

  console.log(
    `Showing first ${limit} of ${records.length} records in deck ${deckName} using ${tagsMsg} ${cardMsg} with ${operationName}:`,
  );
  console.table(records.slice(0, limit));
}

export function printListResult(result: ListResult, deckName: string, options: ListCmdOptions): void {
  const { tags, maxRowCount, operations, cardType } = options;

  if (operations.includes('--list-cards-with-meaning-separator')) {
    printTable(result.recordsByMeaningSeparator!, deckName, tags ?? [], maxRowCount, cardType, 'Meaning Separator');
  }
  if (operations.includes('--list-cards-with-synonym-separator')) {
    printTable(result.recordsBySynonymSeparator!, deckName, tags ?? [], maxRowCount, cardType, 'Synonym Separator');
  }
  if (operations.includes('--list-cards-with-explanation-brackets')) {
    printTable(
      result.recordsByExplanationBrackets!,
      deckName,
      tags ?? [],
      maxRowCount,
      cardType,
      'Explanation Brackets',
    );
  }
}
