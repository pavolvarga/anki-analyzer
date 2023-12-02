import { parse as parseFile } from '../../fileParser/fileParser';
import { parse as parseOptions } from './optionsParser';
import { findDeck } from '../common';

export function commandVerify(file: string, deckName: string, cmdOptions: any): void {
  const records = parseFile(file);
  const options = parseOptions(cmdOptions);

  const deck = findDeck(deckName, records)[1];

  console.log(deck, options);
}
