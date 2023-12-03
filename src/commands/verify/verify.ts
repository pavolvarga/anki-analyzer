import { parse as parseFile } from '../../fileParser/fileParser';
import { parse as parseOptions } from './optionsParser';
import { findDeck } from '../common';
import { verifyMeaningSeparatorUsed, verifyTagsNotUsed, verifyTagsUsed } from './verifications';

export function commandVerify(file: string, deckName: string, cmdOptions: any): void {
  const records = parseFile(file);
  const options = parseOptions(cmdOptions);

  const [name, deck] = findDeck(deckName, records);

  switch (options.operation) {
    case 'verify-meaning-separator-used':
      verifyMeaningSeparatorUsed(name, deck, options);
      break;
    case 'verify-tags-used':
      verifyTagsUsed(name, deck);
      break;
    case 'verify-tags-not-used':
      verifyTagsNotUsed(name, deck);
      break;
    case 'verify-meaning-separator-not-used':
      // verifyMeaningSeparatorNotUsed(deck, options.meaningSeparator, options.tags);
      break;
    default:
      throw new Error(`Unknown verify operation: ${options.operation}`);
  }
}
