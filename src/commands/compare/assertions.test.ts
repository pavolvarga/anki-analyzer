import { partialRight } from 'lodash';
import { AnkiRecord } from '../../types';
import { assertMeaningSepartorIsNotUsed, assertMeaningSepartorIsUsed, assertRecords } from './assertions';

describe('assertMeaningSepartorIsNotUsed', () => {
  it('should throw error when meaning separator is used in card1', () => {
    const record: AnkiRecord = {
      id: '1',
      deckName: 'deck',
      deckType: 'Basic (and reversed card)',
      card1: 'text1 ;; context',
      card2: 'text2',
    };

    expect(() => {
      assertMeaningSepartorIsNotUsed(record, ';;', 1);
    }).toThrow('Assertion failed - meaning separator is used in record 1 in card1: text1 ;; context');
  });
  it('should throw error when meaning separator is used in card2', () => {
    const record: AnkiRecord = {
      id: '1',
      deckName: 'deck',
      deckType: 'Basic (and reversed card)',
      card1: 'text1',
      card2: 'text2 ;; context',
    };

    expect(() => {
      assertMeaningSepartorIsNotUsed(record, ';;', 2);
    }).toThrow('Assertion failed - meaning separator is used in record 1 in card2: text2 ;; context');
  });
});

describe('assertMeaningSepartorIsUsed', () => {
  it('should not throw error when meaning separator is not used in card1', () => {
    const record: AnkiRecord = { id: '1', deckName: 'deck', deckType: 'Basic (and reversed card)', card1: 'text1', card2: 'text2' };

    expect(() => {
      assertMeaningSepartorIsUsed(record, ';;', 1);
    }).toThrow('Assertion failed - meaning separator is not used in record 1 in card1: text1');
  });
  it('should throw error when meaning separator is used in card2', () => {
    const record: AnkiRecord = {id: '1', deckName: 'deck', deckType: 'Basic (and reversed card)', card1: 'text1', card2: 'text2' };

    expect(() => {
      assertMeaningSepartorIsUsed(record, ';;', 2);
    }).toThrow('Assertion failed - meaning separator is not used in record 1 in card2: text2');
  });
});

describe('assertRecords', () => {
  describe('should assert all records in a deck with specified assertions', () => {
    it('should throw an error if a record in a deck does not pass all assertions', () => {
      const deck = new Map<string, AnkiRecord>();
      deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle' });
      deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle' });
      deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle' });
      deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle' });
      deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;, past participle' });

      expect(() => {
        assertRecords(Array.from(deck.values()), [
          partialRight(assertMeaningSepartorIsNotUsed, ';;', 1),
          partialRight(assertMeaningSepartorIsUsed, ';;', 2),
        ]);
      }).toThrow('Assertion failed - meaning separator is not used in record 5 in card2: past tense ;, past participle');
    });

    it('should not throw an error if all records in a deck pass all assertions', () => {
      const deck = new Map<string, AnkiRecord>();
      deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle' });
      deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle' });
      deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle' });
      deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle' });
      deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle' });

      expect(() => {
        assertRecords(Array.from(deck.values()), [
          partialRight(assertMeaningSepartorIsNotUsed, ';;', 1),
          partialRight(assertMeaningSepartorIsUsed, ';;', 2),
        ]);
      }).not.toThrow();
    });
  });
});
