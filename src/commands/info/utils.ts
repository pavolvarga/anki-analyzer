import { InfoTableRow } from '../../types';
import { convertOneAnalysis } from '../common';
import { DeckAnalysis, CmdOptions } from './types';

export function convertToTableFormat(analysis: DeckAnalysis[], options: CmdOptions | undefined): InfoTableRow[] {
  return analysis.map((one: DeckAnalysis) => convertOneAnalysis(one, options));
}

export function createSummary(analysis: DeckAnalysis[], options: CmdOptions | undefined): InfoTableRow {
  const tableRow: InfoTableRow = analysis.reduce(
    (acc, current) => {
      acc.Notes += current.noteCount;
      acc.Cards += current.cardCount;
      acc['Notes with Tags'] += current.tagsCount;
      acc['Cards with Meaning Separator'] += options?.meaningSeparator ? current!.cardsWithMeaningSeparator! : 0;
      acc['Cards with Synonym separator'] += options?.synonymSeparator ? current!.cardsWithSynonymSeparator! : 0;
      acc['Cards with Explanation'] += options?.explanationBrackets ? current!.cardsWithExplanation! : 0;
      return acc;
    },
    {
      Name: '--Summary--',
      Notes: 0,
      Cards: 0,
      'Same Note Type': '',
      'Notes with Tags': 0,
      'Cards with Meaning Separator': 0,
      'Cards with Synonym separator': 0,
      'Cards with Explanation': 0,
    },
  );
  if (options?.meaningSeparator === undefined) {
    delete tableRow['Cards with Meaning Separator'];
  }
  if (options?.synonymSeparator === undefined) {
    delete tableRow['Cards with Synonym separator'];
  }
  if (options?.explanationBrackets === undefined) {
    delete tableRow['Cards with Explanation'];
  }

  return tableRow;
}
