import { partialRight, sortBy } from 'lodash';
import { parse as parseFile } from '../../fileParser/fileParser';
import { findDeck } from '../common';
import { parse as parseOptions } from './optionsParser';
import { assertMeaningSepartorIsNotUsed, assertMeaningSepartorIsUsed, assertRecords } from './assertions';
import { filterDeck, normalizeCards } from './utils';
import { AnkiRecord } from '../../types';
import { CompareCmdOptions } from './types';
import { findMissingInGeneralButPresentInSpecific, findPresentInGeneralButMissingInSpecific } from './comparisons';

// assert that both decks are in expected format
function assert(generalDeck: AnkiRecord[], specificDeck: AnkiRecord[], options: CompareCmdOptions): void {
  assertRecords(generalDeck, [
    partialRight(assertMeaningSepartorIsNotUsed, options.meaningSeparator, 1),
    partialRight(assertMeaningSepartorIsNotUsed, options.meaningSeparator, 2),
  ]);
  assertRecords(specificDeck, [partialRight(assertMeaningSepartorIsUsed, options.meaningSeparator, 1)]);
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
  const generalDeck = findDeck(generalDeckName, records)[1];
  const specificDeck = findDeck(specificDeckName, records)[1];

  // filter general deck to only contain cards with the tag, spedific deck is already narrowed down to only contain cards with the tag
  const generalDeckList = filterDeck(generalDeck, tag);
  const specificDeckList = Array.from(specificDeck.values());

  // assert correct format
  assert(generalDeckList, specificDeckList, options);

  // normalize cards in both decks
  const normalizedGeneralDeck = sortBy(normalizeCards(generalDeckList, options), ['card1']);
  const normalizedSpecificDeck = sortBy(normalizeCards(specificDeckList, options), ['card1']);

  console.log(normalizedGeneralDeck.slice(0, 2));
  console.log(normalizedSpecificDeck.slice(0, 2));

  console.log(findPresentInGeneralButMissingInSpecific(normalizedGeneralDeck, normalizedSpecificDeck).slice(0, 2));
  console.log(findMissingInGeneralButPresentInSpecific(normalizedGeneralDeck, normalizedSpecificDeck).slice(0, 2));
}
