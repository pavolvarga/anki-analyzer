/* eslint-disable */

import { AnkiRecord } from '../../../types';
import { VerifyCmdOptions, VerifyOperation } from '../types';
import { verifyMeaningSeparatorNotUsed, verifyMeaningSeparatorUsed } from './meaningSeparator';

describe('verifyMeaningSeparatorUsed', () => {
  const operation: VerifyOperation = 'verify-meaning-separator-used';

  describe('when tags are specified', () => {
    describe('and when card1 is specified', () => {
      const options: VerifyCmdOptions = { operation, tags: ['noun', 'verb'], operationArg: 'card1', meaningSeparator: ';;' };

      it('should return success if all records with specified tags have meaning separator in card1', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1 ;; aditional-info', card2: 'card2', tags: ['noun'] });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1 ;; context', card2: 'card2', tags: ['noun'] });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1 ;; translation', card2: 'card2', tags: ['verb'] });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });

        const result = verifyMeaningSeparatorUsed('words', deck, options);
        const expected = {
          outcome: 'success',
          successMsg: `Deck words passed --verify-meaning-separator-used verfication. All records with tags 'noun, verb' have meaning separator in card1.`,
        };

        expect(result).toEqual(expected);
      });
      it('should return failure if not all records with specified tags have meaning separator in card 1', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1 ;; aditional-info', card2: 'card2', tags: ['noun'] });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['noun'] });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['verb'] });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1 ;; translation', card2: 'card2', tags: ['verb'] });

        const result = verifyMeaningSeparatorUsed('words', deck, options);
        const expected = {
          outcome: 'failure',
          failed: [
            { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['noun'] },
            { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['verb'] }
          ],
          failureMsg: `Deck words failed --verify-meaning-separator-used verfication. 2 records with tags 'noun, verb' have no meaning separator in card1:`,
        };

        expect(result).toEqual(expected);
      });
    });
    describe('and when card2 is specified', () => {
      const options: VerifyCmdOptions = { operation, tags: ['noun', 'verb'], operationArg: 'card2', meaningSeparator: ';;' };

      it('should return success if all records with specified tags have meaning separator in card2', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2 ;; context', tags: ['noun'] });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2 ;; context', tags: ['noun'] });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2 ;; past tense', tags: ['verb'] });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });

        const result = verifyMeaningSeparatorUsed('words', deck, options);
        const expected = {
          outcome: 'success',
          successMsg: `Deck words passed --verify-meaning-separator-used verfication. All records with tags 'noun, verb' have meaning separator in card2.`,
        };

        expect(result).toEqual(expected);
      });
      it('should return failure if not all records with specified tags have meaning separator in card 2', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2 ;; context', tags: ['noun'] });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['noun'] });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['verb'] });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });

        const result = verifyMeaningSeparatorUsed('words', deck, options);
        const expected = {
          outcome: 'failure',
          failed: [
            { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['noun'] },
            { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['verb'] }
          ],
          failureMsg: `Deck words failed --verify-meaning-separator-used verfication. 2 records with tags 'noun, verb' have no meaning separator in card2:`,
        };

        expect(result).toEqual(expected);
      });
    });
    describe('and when both cards are specified', () => {
      const options: VerifyCmdOptions = { operation, tags: ['verb'], operationArg: 'both', meaningSeparator: ';;' };

      it('should return success if all records with specified tags have meaning separator in both cards', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'word ;; translation', card2: 'past tense ;; past participle', tags: ['verb'] });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'word ;; translation', card2: 'past tense ;; past participle', tags: ['verb'] });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'word ;; translation', card2: 'past tense ;; past participle', tags: ['verb'] });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'word ;; translation', card2: 'past tense ;; past participle', tags: ['verb'] });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'word ;; translation', card2: 'past tense ;; past participle', tags: ['verb'] });

        const result = verifyMeaningSeparatorUsed('words', deck, options);
        const expected = {
          outcome: 'success',
          successMsg: `Deck words passed --verify-meaning-separator-used verfication. All records with tags 'verb' have meaning separator in both cards.`,
        };

        expect(result).toEqual(expected);
      });
      it('should return failure if not all records with specified tags have meaning separator in both cards', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'word ;, translation', card2: 'past tense ;; past participle', tags: ['verb'] });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'word ;; translation', card2: 'past tense ;; past participle', tags: ['verb'] });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'word ;; translation', card2: 'past tense ;; past participle', tags: ['verb'] });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'word ;; translation', card2: 'past tense ,; past participle', tags: ['verb'] });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'word ;; translation', card2: 'past tense ;; past participle', tags: ['verb'] });

        const result = verifyMeaningSeparatorUsed('words', deck, options);
        const expected = {
          outcome: 'failure',
          failed: [
            { id: '1', deckName: 'words', deckType: 'basic', card1: 'word ;, translation', card2: 'past tense ;; past participle', tags: ['verb'] },
            { id: '4', deckName: 'words', deckType: 'basic', card1: 'word ;; translation', card2: 'past tense ,; past participle', tags: ['verb'] }
          ],
          failureMsg: `Deck words failed --verify-meaning-separator-used verfication. 2 records with tags 'verb' have no meaning separator in both cards:`,
        };

        expect(result).toEqual(expected);
      });
    });
  });
  describe('when tags are not specified', () => {
    describe('and when card1 is specified', () => {
      const options: VerifyCmdOptions = { operation, operationArg: 'card1', meaningSeparator: ';;' };

      it('should return success if all records have meaning separator in card1', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1 ;; aditional-info', card2: 'card2' });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1 ;; context', card2: 'card2' });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1 ;; translation', card2: 'card2' });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1 ;; context', card2: 'card2' });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1 ;; context', card2: 'card2' });

        const result = verifyMeaningSeparatorUsed('words', deck, options);
        const expected = {
          outcome: 'success',
          successMsg: `Deck words passed --verify-meaning-separator-used verfication. All records have meaning separator in card1.`,
        };

        expect(result).toEqual(expected);
      });
      it('should return failure if not all records have meaning separator in card 1', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1 ;; aditional-info', card2: 'card2' });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1 ;; context', card2: 'card2' });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1 ; context', card2: 'card2' });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1 ;, context', card2: 'card2' });

        const result = verifyMeaningSeparatorUsed('words', deck, options);
        const expected = {
          outcome: 'failure',
          failed: [
            { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' },
            { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1 ; context', card2: 'card2' },
            { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1 ;, context', card2: 'card2' }
          ],
          failureMsg: `Deck words failed --verify-meaning-separator-used verfication. 3 records have no meaning separator in card1:`,
        };

        expect(result).toEqual(expected);
      });
    });
    describe('and when card2 is specified', () => {
      const options: VerifyCmdOptions = { operation, operationArg: 'card2', meaningSeparator: ';;' };

      it('should return success if all records have meaning separator in card2', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2 ;; context' });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2 ;; context' });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2 ;; translation' });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2 ;; context' });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2 ;; context' });

        const result = verifyMeaningSeparatorUsed('words', deck, options);
        const expected = {
          outcome: 'success',
          successMsg: `Deck words passed --verify-meaning-separator-used verfication. All records have meaning separator in card2.`,
        };

        expect(result).toEqual(expected);
      });
      it('should return failure if not all records have meaning separator in card 2', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2 ;; context' });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2 ;; context' });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2 ;; context' });

        const result = verifyMeaningSeparatorUsed('words', deck, options);
        const expected = {
          outcome: 'failure',
          failed: [
            { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' },
            { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' }
          ],
          failureMsg: `Deck words failed --verify-meaning-separator-used verfication. 2 records have no meaning separator in card2:`,
        };

        expect(result).toEqual(expected);
      });
    });
    describe('and when both cards are specified', () => {
      const options: VerifyCmdOptions = { operation, operationArg: 'both', meaningSeparator: ';;' };

      it('should return success if all records have meaning separator in both cards', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'word ;; translation', card2: 'past tense ;; past participle' });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'word ;; translation', card2: 'past tense ;; past participle' });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'word ;; translation', card2: 'past tense ;; past participle' });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'word ;; translation', card2: 'past tense ;; past participle' });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'word ;; translation', card2: 'past tense ;; past participle' });

        const result = verifyMeaningSeparatorUsed('words', deck, options);
        const expected = {
          outcome: 'success',
          successMsg: `Deck words passed --verify-meaning-separator-used verfication. All records have meaning separator in both cards.`,
        };

        expect(result).toEqual(expected);
      });
      it('should return failure if not all records have meaning separator in both cards', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'word ;, translation', card2: 'past tense ;; past participle' });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'word ;; translation', card2: 'past tense ;; past participle' });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'word ;; translation', card2: 'past tense ,; past participle' });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'word ;; translation', card2: 'past tense ;; past participle' });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'word', card2: 'past tense ;; past participle' });

        const result = verifyMeaningSeparatorUsed('words', deck, options);
        const expected = {
          outcome: 'failure',
          failed: [
            { id: '1', deckName: 'words', deckType: 'basic', card1: 'word ;, translation', card2: 'past tense ;; past participle' },
            { id: '3', deckName: 'words', deckType: 'basic', card1: 'word ;; translation', card2: 'past tense ,; past participle' },
            { id: '5', deckName: 'words', deckType: 'basic', card1: 'word', card2: 'past tense ;; past participle' }
          ],
          failureMsg: `Deck words failed --verify-meaning-separator-used verfication. 3 records have no meaning separator in both cards:`,
        };

        expect(result).toEqual(expected);
      });
    });
  });
});

describe('verifyMeaningSeparatorNotUsed', () => {
  const operation: VerifyOperation = 'verify-meaning-separator-not-used';

  describe('when tags are specified', () => {
    describe('and when card1 is specified', () => {
      const options: VerifyCmdOptions = { operation, tags: ['noun', 'verb'], operationArg: 'card1', meaningSeparator: ';;' };

      it('should return success if all records have no meaning separator in card1', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['noun'] });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['noun'] });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle', tags: ['verb'] });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle', tags: ['verb'] });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle', tags: ['verb'] });

        const result = verifyMeaningSeparatorNotUsed('words', deck, options);
        const expected = {
          outcome: 'success',
          successMsg: `Deck words passed --verify-meaning-separator-not-used verfication. No records with tags 'noun, verb' have meaning separator in card1.`,
        };

        expect(result).toEqual(expected);
      });
      it('should return failure if some records have meaning separator in card1', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1 ;; context', card2: 'card2', tags: ['noun'] });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['noun'] });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle', tags: ['verb'] });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle', tags: ['verb'] });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle', tags: ['verb'] });

        const result = verifyMeaningSeparatorNotUsed('words', deck, options);
        const expected = {
          outcome: 'failure',
          failed: [
            { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1 ;; context', card2: 'card2', tags: ['noun'] },
          ],
          failureMsg: `Deck words failed --verify-meaning-separator-not-used verfication. 1 records with tags 'noun, verb' have meaning separator in card1:`,
        };

        expect(result).toEqual(expected);
      });
    });
    describe('and when card2 is specified', () => {
      const options: VerifyCmdOptions = { operation, tags: ['noun', 'verb'], operationArg: 'card2', meaningSeparator: ';;' };

      it('should return success if all records have no meaning separator in card2', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1 ;; context', card2: 'card2', tags: ['noun'] });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['noun'] });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['verb'] });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['verb'] });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['verb'] });

        const result = verifyMeaningSeparatorNotUsed('words', deck, options);
        const expected = {
          outcome: 'success',
          successMsg: `Deck words passed --verify-meaning-separator-not-used verfication. No records with tags 'noun, verb' have meaning separator in card2.`,
        };

        expect(result).toEqual(expected);
      });
      it('should return failure if some records have meaning separator in card 2', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1 ;; context', card2: 'card2', tags: ['noun'] });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['noun'] });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle', tags: ['verb'] });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle', tags: ['verb'] });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle', tags: ['verb'] });

        const result = verifyMeaningSeparatorNotUsed('words', deck, options);
        const expected = {
          outcome: 'failure',
          failed: [
            { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle', tags: ['verb'] },
            { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle', tags: ['verb'] },
            { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle', tags: ['verb'] },
          ],
          failureMsg: `Deck words failed --verify-meaning-separator-not-used verfication. 3 records with tags 'noun, verb' have meaning separator in card2:`,
        };

        expect(result).toEqual(expected);
      });
    });
    describe('and when both cards are specified', () => {
      const options: VerifyCmdOptions = { operation, tags: ['noun', 'verb'], operationArg: 'both', meaningSeparator: ';;' };

      it('should return success if no records have meaning separator in both cards', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['noun'] });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['noun'] });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['verb'] });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['verb'] });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['verb'] });

        const result = verifyMeaningSeparatorNotUsed('words', deck, options);
        const expected = {
          outcome: 'success',
          successMsg: `Deck words passed --verify-meaning-separator-not-used verfication. No records with tags 'noun, verb' have meaning separator in both cards.`,
        };

        expect(result).toEqual(expected);
      });
      it('should return failure if some records have meaning separator in both cards', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1 ;; context', card2: 'card2', tags: ['noun'] });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2 ;; context', tags: ['noun'] });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['verb'] });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['verb'] });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2', tags: ['verb'] });

        const result = verifyMeaningSeparatorNotUsed('words', deck, options);
        const expected = {
          outcome: 'failure',
          failed: [
            { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1 ;; context', card2: 'card2', tags: ['noun'] },
            { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2 ;; context', tags: ['noun'] },
          ],
          failureMsg: `Deck words failed --verify-meaning-separator-not-used verfication. 2 records with tags 'noun, verb' have meaning separator in both cards:`,
        };

        expect(result).toEqual(expected);
      });
    });
  });
  describe('when tags are not specified', () => {
    describe('and when card1 is specified', () => {
      const options: VerifyCmdOptions = { operation, operationArg: 'card1', meaningSeparator: ';;' };

      it('should return success if all records have no meaning separator in card1', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle' });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle' });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle' });

        const result = verifyMeaningSeparatorNotUsed('words', deck, options);
        const expected = {
          outcome: 'success',
          successMsg: `Deck words passed --verify-meaning-separator-not-used verfication. No records have meaning separator in card1.`,
        };

        expect(result).toEqual(expected);
      });
      it('should return failure if some records have meaning separator in card1', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1 ;; context', card2: 'card2' });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1 ;; context', card2: 'card2' });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle' });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle' });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle' });

        const result = verifyMeaningSeparatorNotUsed('words', deck, options);
        const expected = {
          outcome: 'failure',
          failed: [
            { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1 ;; context', card2: 'card2' },
            { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1 ;; context', card2: 'card2' },
          ],
          failureMsg: `Deck words failed --verify-meaning-separator-not-used verfication. 2 records have meaning separator in card1:`,
        };

        expect(result).toEqual(expected);
      });
    });
    describe('and when card2 is specified', () => {
      const options: VerifyCmdOptions = { operation, operationArg: 'card2', meaningSeparator: ';;' };

      it('should return success if all records have no meaning separator in card2', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1 ;; translation', card2: 'card2' });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1 ;; context', card2: 'card2' });

        const result = verifyMeaningSeparatorNotUsed('words', deck, options);
        const expected = {
          outcome: 'success',
          successMsg: `Deck words passed --verify-meaning-separator-not-used verfication. No records have meaning separator in card2.`,
        };

        expect(result).toEqual(expected);
      });
      it('should return failure if some records have meaning separator in card2', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle' });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle' });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle' });

        const result = verifyMeaningSeparatorNotUsed('words', deck, options);
        const expected = {
          outcome: 'failure',
          failed: [
            { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle' },
            { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle' },
            { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'past tense ;; past participle' },
          ],
          failureMsg: `Deck words failed --verify-meaning-separator-not-used verfication. 3 records have meaning separator in card2:`,
        };

        expect(result).toEqual(expected);
      });
    });
    describe('and when both cards are specified', () => {
      const options: VerifyCmdOptions = { operation, operationArg: 'both', meaningSeparator: ';;' };

      it('should return success if all records have no meaning separator in both cards', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2' });

        const result = verifyMeaningSeparatorNotUsed('words', deck, options);
        const expected = {
          outcome: 'success',
          successMsg: `Deck words passed --verify-meaning-separator-not-used verfication. No records have meaning separator in both cards.`,
        };

        expect(result).toEqual(expected);
      });
      it('should return failure if some records have meaning separator in both cards', () => {
        const deck = new Map<string, AnkiRecord>();
        deck.set('1', { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1 ;; context', card2: 'card2' });
        deck.set('2', { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2 ;; context' });
        deck.set('3', { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2 ;; context' });
        deck.set('4', { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2 ;; context' });
        deck.set('5', { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1 ;; context', card2: 'card2' });

        const result = verifyMeaningSeparatorNotUsed('words', deck, options);
        const expected = {
          outcome: 'failure',
          failed: [
            { id: '1', deckName: 'words', deckType: 'basic', card1: 'card1 ;; context', card2: 'card2' },
            { id: '2', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2 ;; context' },
            { id: '3', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2 ;; context' },
            { id: '4', deckName: 'words', deckType: 'basic', card1: 'card1', card2: 'card2 ;; context' },
            { id: '5', deckName: 'words', deckType: 'basic', card1: 'card1 ;; context', card2: 'card2' },
          ],
          failureMsg: `Deck words failed --verify-meaning-separator-not-used verfication. 5 records have meaning separator in both cards:`,
        };

        expect(result).toEqual(expected);
      });
    });
  });
});
