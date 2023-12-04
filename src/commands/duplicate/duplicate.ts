import { parse as parseFile } from '../../fileParser/fileParser';
import { findDeck } from '../common';
import { parse as parseOptions } from './optionsParser';

export function commandDuplicate(file: string, deckName: string, cmdOptions: any): void {
  const records = parseFile(file);
  const options = parseOptions(cmdOptions);

  const [name, deck] = findDeck(deckName, records);

  console.log(name, deck, options);
}
