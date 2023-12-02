import { partialRight } from 'lodash';
import { parse as parseFile } from '../../fileParser/fileParser';
import { AnkiRecord } from '../../types';
import { findDeck } from '../common';
import { parse as parseOptions, useDefaults as useDefaultOptions } from '../optionsParser';
import { assertMeaningSepartorIsNotUsed, assertMeaningSepartorIsUsed, assertRecords } from './assertions';

// n!fX9	Basic (and reversed card)	Deutsch::Wörterbuch	mögen	to like, to enjoy	verb

// pU1h/@tD$O	Basic (and reversed card)	Deutsch::Verben	mögen ;; to like, to enjoy	mochte ;; hat gemocht

function filterDeck(deck: Map<string, AnkiRecord>, tag: string): AnkiRecord[] {
  return Array.from(deck.values()).filter((record: AnkiRecord) => record.tags?.includes(tag));
}

export function commandCompare(
  file: string,
  generalDeckName: string,
  specificDeckName: string,
  tag: string,
  cmdOptions: any,
): void {
  const records = parseFile(file);
  const options = useDefaultOptions(parseOptions(cmdOptions));

  // find both decks
  const generalDeck = findDeck(generalDeckName, records)[1];
  const specificDeck = findDeck(specificDeckName, records)[1];

  // filter general deck to only contain cards with the tag
  const filteredGeneralDeck = filterDeck(generalDeck, tag);

  // assert that both decks are in expected format
  assertRecords(filteredGeneralDeck, [
    partialRight(assertMeaningSepartorIsNotUsed, options.meaningSeparator, 1),
    partialRight(assertMeaningSepartorIsNotUsed, options.meaningSeparator, 2),
  ]);
  assertRecords(Array.from(specificDeck.values()), [
    partialRight(assertMeaningSepartorIsUsed, options.meaningSeparator, 1),
  ]);

  // todo: continue when assert command is ready
  console.log(records, file, generalDeck, specificDeck, tag, options);
}
