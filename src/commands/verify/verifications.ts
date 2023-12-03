import { intersection } from 'lodash';
import { AnkiRecord } from '../../types';
import { VerifyCmdOptions } from './types';
import { printRecord } from '../../print';

function hasMeaningSeparator(card: string, meaningSeparator: string): boolean {
  return card.includes(meaningSeparator);
}

function filterRecords(deck: Map<string, AnkiRecord>, tags?: string[]): AnkiRecord[] {
  return (tags ?? []).length === 0
    ? Array.from(deck.values())
    : Array.from(deck.values()).filter((record) => {
        const recordTags = record.tags ?? [];
        return intersection(tags, recordTags).length > 0;
      });
}

export function verifyMeaningSeparatorUsed(deckName: string, deck: Map<string, AnkiRecord>, options: VerifyCmdOptions) {
  const { meaningSeparator, tags, operationArg } = options;

  const records = filterRecords(deck, tags);

  let failed: AnkiRecord[] = [];

  switch (operationArg) {
    case 'card1':
      failed = records.filter((record) => !hasMeaningSeparator(record.card1, meaningSeparator));
      break;
    case 'card2':
      failed = records.filter((record) => !hasMeaningSeparator(record.card2, meaningSeparator));
      break;
    case 'both':
      failed = records.filter(
        (record) =>
          !hasMeaningSeparator(record.card1, meaningSeparator) || !hasMeaningSeparator(record.card2, meaningSeparator),
      );
      break;
    default:
      throw new Error(`Unknown card type: ${operationArg}`);
  }

  // success
  if (failed.length === 0) {
    if (tags === undefined || tags.length === 0) {
      console.info(
        `Deck ${deckName} passed --verify-meaning-separator-used verfication. All records have meaning separator.`,
      );
      return;
    } else {
      console.info(
        // eslint-disable-next-line
        `Deck ${deckName} passed --verify-meaning-separator-used verfication. All records with tags '${tags.join(', ')}' have meaning separator.`,
      );
      return;
    }
  }

  // failure
  if (tags === undefined || tags.length === 0) {
    console.info(
      // eslint-disable-next-line
      `Deck ${deckName} failed --verify-meaning-separator-used verfication. ${failed.length} records have no meaning separator in ${operationArg === 'both' ? operationArg + ' cards' : operationArg}:`,
    );
    failed.forEach((record) => printRecord(record, true));
    return;
  } else {
    console.info(
      // eslint-disable-next-line
      `Deck ${deckName} failed --verify-meaning-separator-used verfication. ${failed.length} records with tags '${tags.join(', ')}' have no meaning separator in ${operationArg === 'both' ? operationArg + ' cards' : operationArg}:`,
    );
    failed.forEach((record) => printRecord(record, true));
    return;
  }
}

export function verifyMeaningSeparatorNotUsed(deckName: string, deck: Map<string, AnkiRecord>, options: VerifyCmdOptions) {
  const { meaningSeparator, tags, operationArg } = options;

  const records = filterRecords(deck, tags);

  let failed: AnkiRecord[] = [];

  switch (operationArg) {
    case 'card1':
      failed = records.filter((record) => hasMeaningSeparator(record.card1, meaningSeparator));
      break;
    case 'card2':
      failed = records.filter((record) => hasMeaningSeparator(record.card2, meaningSeparator));
      break;
    case 'both':
      failed = records.filter(
        (record) =>
          hasMeaningSeparator(record.card1, meaningSeparator) || hasMeaningSeparator(record.card2, meaningSeparator),
      );
      break;
    default:
      throw new Error(`Unknown card type: ${operationArg}`);
  }

  // success
  if (failed.length === 0) {
    if (tags === undefined || tags.length === 0) {
      console.info(
        `Deck ${deckName} passed --verify-meaning-separator-not-used verfication. No records have meaning separator.`,
      );
      return;
    } else {
      console.info(
        // eslint-disable-next-line
        `Deck ${deckName} passed --verify-meaning-separator-not-used verfication. No records with tags '${tags.join(', ')}' have meaning separator.`,
      );
      return;
    }
  }

  // failure
  if (tags === undefined || tags.length === 0) {
    console.info(
      // eslint-disable-next-line
      `Deck ${deckName} failed --verify-meaning-separator-not-used verfication. ${failed.length} records have meaning separator in ${operationArg === 'both' ? operationArg + ' cards' : operationArg}:`,
    );
    failed.forEach((record) => printRecord(record, true));
    return;
  } else {
    console.info(
      // eslint-disable-next-line
      `Deck ${deckName} failed --verify-meaning-separator-not-used verfication. ${failed.length} records with tags '${tags.join(', ')}' have meaning separator in ${operationArg === 'both' ? operationArg + ' cards' : operationArg}:`,
    );
    failed.forEach((record) => printRecord(record, true));
    return;
  }
}

export function verifyTagsUsed(deckName: string, deck: Map<string, AnkiRecord>) {
  const withoutTags = Array.from(deck.values()).filter(
    (record) => record.tags === undefined || record.tags.length === 0,
  );

  // success
  if (withoutTags.length === 0) {
    console.info(`Deck ${deckName} passed --verify-tags-used verfication. All records have tags.`);
    return;
  }

  // failure
  console.info(`Deck ${deckName} failed --verify-tags-used verfication. ${withoutTags.length} records have no tags:`);
  withoutTags.forEach((record) => printRecord(record, true));
}

export function verifyTagsNotUsed(deckName: string, deck: Map<string, AnkiRecord>) {
  const withTags = Array.from(deck.values()).filter((record) => record.tags !== undefined && record.tags.length > 0);

  // success
  if (withTags.length === 0) {
    console.info(`Deck ${deckName} passed --verify-tags-not-used verfication. None of the records has tags.`);
    return;
  }

  // failure
  console.info(`Deck ${deckName} failed --verify-tags-not-used verfication. ${withTags.length} records have tags:`);
  withTags.forEach((record) => printRecord(record, true));
}
