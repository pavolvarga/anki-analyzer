import { parse as parseFile } from '../../fileParser/fileParser';
import { parse as parseOptions } from './optionsParser';
import { filterRecords, findDeck } from '../common';
import { printDetails, printStatus } from './print';
import { findDuplicatesInCardWords } from './utils';

export function commandDuplicates(file: string, deckName: string, cmdOptions: any): void {
  const records = parseFile(file);
  const options = parseOptions(cmdOptions);

  const [name, deck] = findDeck(deckName, records);
  const filteredDeck = filterRecords(deck, options.tags);

  const duplicates = findDuplicatesInCardWords(filteredDeck, options.synonymSeparator);

  printStatus(duplicates, name, options.tags);
  if (options.cardType) {
    printDetails(duplicates, name, options);
  }
}
