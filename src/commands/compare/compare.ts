import { parse as parseFile } from '../../fileParser/fileParser';
import { findDeck } from '../common';
import { parse as parseOptions } from '../optionsParser';

export function commandCompare(
  file: string,
  generalDeckName: string,
  specificDeckName: string,
  tag: string,
  cmdOptions: any,
): void {
  const records = parseFile(file);
  const options = parseOptions(cmdOptions);

  // find both decks
  const generalDeck = findDeck(generalDeckName, records)[1];
  const specificDeck = findDeck(specificDeckName, records)[1];

  console.log(records, file, generalDeck, specificDeck, tag, options);
}
