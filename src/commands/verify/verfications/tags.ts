import { AnkiRecord } from '../../../types';
import { VerificationResult } from '../types';

export function verifyTagsUsed(deckName: string, deck: Map<string, AnkiRecord>): VerificationResult {
  const withoutTags = Array.from(deck.values()).filter(
    (record) => record.tags === undefined || record.tags.length === 0,
  );

  // success
  if (withoutTags.length === 0) {
    return {
      outcome: 'success',
      successMsg: `Deck ${deckName} passed --verify-tags-used verfication. All records have tags.`,
    };
  }

  // failure
  return {
    outcome: 'failure',
    failed: withoutTags,
    failureMsg: `Deck ${deckName} failed --verify-tags-used verfication. ${withoutTags.length} records have no tags:`,
  };
}

export function verifyTagsNotUsed(deckName: string, deck: Map<string, AnkiRecord>): VerificationResult {
  const withTags = Array.from(deck.values()).filter((record) => record.tags !== undefined && record.tags.length > 0);

  // success
  if (withTags.length === 0) {
    return {
      outcome: 'success',
      successMsg: `Deck ${deckName} passed --verify-tags-not-used verfication. None of the records has tags.`,
    };
  }

  // failure
  return {
    outcome: 'failure',
    failed: withTags,
    failureMsg: `Deck ${deckName} failed --verify-tags-not-used verfication. ${withTags.length} records have tags:`,
  };
}
