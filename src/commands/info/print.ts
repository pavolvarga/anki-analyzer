import { InfoTableRow } from '../../types';
import { DeckAnalysis, InfoCmdOptions } from './types';
import { convertToTableFormat } from './utils';

export function printResult(
  analysis: DeckAnalysis[],
  summary: InfoTableRow,
  options: InfoCmdOptions | undefined,
): void {
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
