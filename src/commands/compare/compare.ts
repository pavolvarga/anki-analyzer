import { partialRight, sortBy } from 'lodash';
import { parse as parseFile } from '../../fileParser/fileParser';
import { parse as parseOptions } from './optionsParser';
import { findDeck } from '../common';
import { assertMeaningSepartorIsNotUsed, assertMeaningSepartorIsUsed, assertRecords } from './assertions';
import { compareCards, filterDeck } from './utils/utils';
import { normalizeCards } from './utils/normalization';
import { AnkiRecord } from '../../types';
import { CompareCmdOptions } from './types';
import { printDetails, printStatus } from './print';

// assert that both decks are in expected format
function assert(
  generalDeck: AnkiRecord[],
  specificDeck: AnkiRecord[],
  options: CompareCmdOptions,
  generalDeckName: string,
  specificDeckName: string,
): void {
  assertRecords(generalDeck, [
    partialRight(assertMeaningSepartorIsNotUsed, options.meaningSeparator, 1, generalDeckName),
    partialRight(assertMeaningSepartorIsNotUsed, options.meaningSeparator, 2, generalDeckName),
  ]);
  assertRecords(specificDeck, [
    partialRight(assertMeaningSepartorIsUsed, options.meaningSeparator, 1, specificDeckName),
  ]);
}

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
  const [fullGeneralDeckName, generalDeck] = findDeck(generalDeckName, records);
  const [fullSpecificDeckName, specificDeck] = findDeck(specificDeckName, records);

  // filter general deck to only contain cards with the tag, spedific deck is already narrowed down to only contain cards with the tag
  const generalDeckList = filterDeck(generalDeck, tag);
  const specificDeckList = Array.from(specificDeck.values());

  // assert correct format
  assert(generalDeckList, specificDeckList, options, fullGeneralDeckName, fullSpecificDeckName);

  // normalize cards in both decks
  const normalizedGeneralDeck = sortBy(normalizeCards(generalDeckList, options), ['card1']);
  const normalizedSpecificDeck = sortBy(normalizeCards(specificDeckList, options), ['card1']);

  const result = compareCards(normalizedGeneralDeck, normalizedSpecificDeck);

  printStatus(
    fullGeneralDeckName,
    fullSpecificDeckName,
    tag,
    result,
    normalizedGeneralDeck.length,
    normalizedSpecificDeck.length,
    options.prefixSeparator,
  );
  if (options.comparisionTable) {
    printDetails(result, options, fullGeneralDeckName, fullSpecificDeckName);
  }
}
