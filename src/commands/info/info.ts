import { parse as parseFile } from '../../fileParser/fileParser';
import { parse as parseOptions } from './optionsParser';
import { DeckAnalysis } from './types';
import { analyzeDeck } from '../common';
import { createSummary, convertToTableFormat } from './utils';

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
  if (options?.explanationBrackets) {
    console.log(`Used bracket type for explanation: "${options!.explanationBrackets}"`);
  }
  const table = [...convertToTableFormat(analysis, options), summary];

  console.table(table);
}
