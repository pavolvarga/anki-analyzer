import { parse as parseFile } from '../../fileParser/fileParser';
import { parse as parseOptions } from '../optionsParser';
import { DeckAnalysis, InfoCmdOptions, TableRow } from '../types';
import { analyzeDeck, convertOneAnalysis } from '../common';

function convertToTableFormat(analysis: DeckAnalysis[], options: InfoCmdOptions | undefined): TableRow[] {
  return analysis.map((one: DeckAnalysis) => convertOneAnalysis(one, options));
}

function createSummary(analysis: DeckAnalysis[], options: InfoCmdOptions | undefined): TableRow {
  const tableRow: TableRow = analysis.reduce(
    (acc, current) => {
      acc.Notes += current.noteCount;
      acc.Cards += current.cardCount;
      acc['Notes with Tags'] += current.tagsCount;
      acc['Cards with Meaning Separator'] += options?.meaningSeparator ? current!.cardsWithMeaningSeparator! : 0;
      acc['Cards with Synonym separator'] += options?.synonymSeparator ? current!.cardsWithSynonymSeparator! : 0;
      acc['Cards with Explanation'] += options?.explanationBracket ? current!.cardsWithExplanation! : 0;
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
  if (options?.explanationBracket === undefined) {
    delete tableRow['Cards with Explanation'];
  }

  return tableRow;
}

export function commandInfo(file: string, cmdOptions: any): void {
  const records = parseFile(file);
  const options = parseOptions(cmdOptions);

  const analysis = Array.from(records.byDeck.entries())
    .map(([name, deck]) => analyzeDeck(deck, name, options))
    .sort((analysis1: DeckAnalysis, analysis2: DeckAnalysis) => analysis2.noteCount - analysis1.noteCount);
  const summary = createSummary(analysis, options);

  if (options?.meaningSeparator) {
    console.log(`Used meaning separator: "${options!.meaningSeparator}"`);
  }
  if (options?.synonymSeparator) {
    console.log(`Used meaning separator: "${options!.synonymSeparator}"`);
  }
  if (options?.explanationBracket) {
    console.log(`Used bracket type for explanation: "${options!.explanationBracket}"`);
  }
  const table = [...convertToTableFormat(analysis, options), summary];

  console.table(table);
}
