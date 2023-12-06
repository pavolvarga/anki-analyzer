import { parse as parseFile } from '../../fileParser/fileParser';
import { filterRecords, findDeck } from '../common';
import { parse as parseOptions } from './optionsParser';
import { printListResult } from './print';
import { findRecordsForListOperations } from './utils';

export function commandList(file: string, deckName: string, cmdOptions: any): void {
  const records = parseFile(file);
  const options = parseOptions(cmdOptions);

  const [name, deck] = findDeck(deckName, records);
  const filteredDeck = filterRecords(deck, options.tags);

  const result = findRecordsForListOperations(filteredDeck, options);

  printListResult(result, name, options);
}
