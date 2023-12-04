import { AnkiRecord, CardType } from '../../../types';
import { VerificationResult, VerifyCmdOptions } from '../types';
import { filterRecords } from '../../common';

function hasMeaningSeparator(card: string, meaningSeparator: string): boolean {
  return card.includes(meaningSeparator);
}

function createCardMsg(cardType: CardType): string {
  return `${cardType === 'both' ? cardType + ' cards' : cardType}`;
}

export function verifyMeaningSeparatorUsed(
  deckName: string,
  deck: Map<string, AnkiRecord>,
  options: VerifyCmdOptions,
): VerificationResult {
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
    return {
      outcome: 'success',
      /* eslint-disable */
      successMsg: tags === undefined || tags.length === 0
        ? `Deck ${deckName} passed --verify-meaning-separator-used verfication. All records have meaning separator in ${createCardMsg(operationArg)}.`
        : `Deck ${deckName} passed --verify-meaning-separator-used verfication. All records with tags '${tags.join(', ')}' have meaning separator in ${createCardMsg(operationArg)}.`,
      /* eslint-enable */
    };
  }

  // failure
  return {
    outcome: 'failure',
    failed,
    /* eslint-disable */
    failureMsg: tags === undefined || tags.length === 0
      ? `Deck ${deckName} failed --verify-meaning-separator-used verfication. ${failed.length} records have no meaning separator in ${createCardMsg(operationArg)}:`
      : `Deck ${deckName} failed --verify-meaning-separator-used verfication. ${failed.length} records with tags '${tags.join(', ')}' have no meaning separator in ${createCardMsg(operationArg)}:`,
    /* eslint-enable */
  };
}

export function verifyMeaningSeparatorNotUsed(
  deckName: string,
  deck: Map<string, AnkiRecord>,
  options: VerifyCmdOptions,
): VerificationResult {
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
    return {
      outcome: 'success',
      /* eslint-disable */
      successMsg: tags === undefined || tags.length === 0
        ? `Deck ${deckName} passed --verify-meaning-separator-not-used verfication. No records have meaning separator in ${createCardMsg(operationArg)}.`
        : `Deck ${deckName} passed --verify-meaning-separator-not-used verfication. No records with tags '${tags.join(', ')}' have meaning separator in ${createCardMsg(operationArg)}.`,
      /* eslint-enable */
    };
  }

  // failure
  return {
    outcome: 'failure',
    failed,
    /* eslint-disable */
    failureMsg: tags === undefined || tags.length === 0
      ? `Deck ${deckName} failed --verify-meaning-separator-not-used verfication. ${failed.length} records have meaning separator in ${createCardMsg(operationArg)}:`
      : `Deck ${deckName} failed --verify-meaning-separator-not-used verfication. ${failed.length} records with tags '${tags.join(', ')}' have meaning separator in ${createCardMsg(operationArg)}:`,
    /* eslint-enable */
  };
}
