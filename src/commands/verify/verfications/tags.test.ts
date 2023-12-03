/* eslint-disable */

import { AnkiRecord } from '../../../types';
import { verifyTagsNotUsed, verifyTagsUsed } from './tags';

describe('verifyTagsUsed', () => {
  it('should return success if all records have tags', () => {
    const deck = new Map<string, AnkiRecord>();
    deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['noun'] });
    deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['noun'] });
    deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['verb'] });
    deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['adjective', 'adverb'] });
    deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['preposition'] });

    const result = verifyTagsUsed('words', deck);
    const expected = {
      outcome: 'success',
      successMsg: `Deck words passed --verify-tags-used verfication. All records have tags.`,
    };

    expect(result).toEqual(expected);
  });
  it('should return failure if some records have no tags', () => {
    const deck = new Map<string, AnkiRecord>();
    deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['noun'] });
    deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: [] });
    deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['verb'] });
    deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['adjective', 'adverb'] });
    deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });

    const result = verifyTagsUsed('words', deck);
    const expected = {
      outcome: 'failure',
      failed: [
        { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: [] },
        { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' },
      ],
      failureMsg: `Deck words failed --verify-tags-used verfication. 2 records have no tags:`,
    };

    expect(result).toEqual(expected);
  });
});

describe('verifyTagsNotUsed', () => {
  it('should return success if none of the records has tags', () => {
    const deck = new Map<string, AnkiRecord>();
    deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
    deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
    deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
    deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
    deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });

    const result = verifyTagsNotUsed('words', deck);
    const expected = {
      outcome: 'success',
      successMsg: `Deck words passed --verify-tags-not-used verfication. None of the records has tags.`,
    };

    expect(result).toEqual(expected);
  });
  it('should return failure if some records have tags', () => {
    const deck = new Map<string, AnkiRecord>();
    deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['noun'] });
    deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
    deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['verb'] });
    deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
    deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });

    const result = verifyTagsNotUsed('words', deck);
    const expected = {
      outcome: 'failure',
      failed: [
        { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['noun'] },
        { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['verb'] },
      ],
      failureMsg: `Deck words failed --verify-tags-not-used verfication. 2 records have tags:`,
    };

    expect(result).toEqual(expected);
  });
});
