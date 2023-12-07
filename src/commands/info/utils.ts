import { InfoTableRow } from '../../types';
import { DeckAnalysis, InfoCmdOptions } from './types';

export function convertOneAnalysis(analysis: DeckAnalysis, options: InfoCmdOptions | undefined): InfoTableRow {
  const tableRow: InfoTableRow = {
    Name: analysis.name,
    Notes: analysis.noteCount,
    Cards: analysis.cardCount,
    'Same Note Type': analysis.sameNoteType ? 'yes' : 'no',
    'Notes with Tags': analysis.tagsCount,
  };
  if (options?.meaningSeparator) {
    tableRow['Cards with Meaning Separator'] = analysis.cardsWithMeaningSeparator;
  }
  if (options?.synonymSeparator) {
    tableRow['Cards with Synonym separator'] = analysis.cardsWithSynonymSeparator;
  }
  if (options?.explanationBrackets) {
    tableRow['Cards with Explanation'] = analysis.cardsWithExplanation;
  }
  if (options?.prefixSeparator) {
    tableRow['Cards with Prefix Separator'] = analysis.cardsWithPrefixSeparator;
  }
  return tableRow;
}

export function convertToTableFormat(analysis: DeckAnalysis[], options: InfoCmdOptions | undefined): InfoTableRow[] {
  return analysis.map((one: DeckAnalysis) => convertOneAnalysis(one, options));
}

export function createSummary(analysis: DeckAnalysis[], options: InfoCmdOptions | undefined): InfoTableRow {
  const tableRow: InfoTableRow = analysis.reduce(
    (acc, current) => {
      acc.Notes += current.noteCount;
      acc.Cards += current.cardCount;
      acc['Notes with Tags'] += current.tagsCount;
      acc['Cards with Meaning Separator'] += options?.meaningSeparator ? current!.cardsWithMeaningSeparator! : 0;
      acc['Cards with Synonym separator'] += options?.synonymSeparator ? current!.cardsWithSynonymSeparator! : 0;
      acc['Cards with Explanation'] += options?.explanationBrackets ? current!.cardsWithExplanation! : 0;
      acc['Cards with Prefix Separator'] += options?.prefixSeparator ? current!.cardsWithPrefixSeparator! : 0;
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
      'Cards with Prefix Separator': 0,
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
  if (options?.prefixSeparator === undefined) {
    delete tableRow['Cards with Prefix Separator'];
  }

  return tableRow;
}
