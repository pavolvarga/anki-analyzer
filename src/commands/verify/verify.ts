import { parse as parseFile } from '../../fileParser/fileParser';
import { parse as parseOptions } from './optionsParser';
import { findDeck } from '../common';
import { verifyTagsNotUsed, verifyTagsUsed } from './verfications/tags';
import { verifyMeaningSeparatorNotUsed, verifyMeaningSeparatorUsed } from './verfications/meaningSeparator';
import { VerificationResult } from './types';
import { printResult } from './print';

export function commandVerify(file: string, deckName: string, cmdOptions: any): void {
  const records = parseFile(file);
  const options = parseOptions(cmdOptions);

  const [name, deck] = findDeck(deckName, records);

  let result: VerificationResult;

  switch (options.operation) {
    case 'verify-meaning-separator-used':
      result = verifyMeaningSeparatorUsed(name, deck, options);
      break;
    case 'verify-meaning-separator-not-used':
      result = verifyMeaningSeparatorNotUsed(name, deck, options);
      break;
    case 'verify-tags-used':
      result = verifyTagsUsed(name, deck);
      break;
    case 'verify-tags-not-used':
      result = verifyTagsNotUsed(name, deck);
      break;
    default:
      throw new Error(`Unknown verify operation: ${options.operation}`);
  }

  printResult(result, options);
}
