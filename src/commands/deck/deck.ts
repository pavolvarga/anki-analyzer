import { parse as parseFile } from '../../fileParser/fileParser';
import { parse as parseOptions } from './optionsParser';
import { convertOneAnalysis } from '../info/utils';
import { analyzeDeck, findDeck } from '../common';
import { printResult } from './print';

export function commandDeck(file: string, inputDeckName: string, cmdOptions: any): void {
  const records = parseFile(file);
  const options = parseOptions(cmdOptions);
  const [name, deck] = findDeck(inputDeckName, records);

  const analysis = analyzeDeck(deck, name, options);
  let table = convertOneAnalysis(analysis, options);

  printResult(table, options, deck);
}
