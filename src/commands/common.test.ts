import { AnkiRecord } from '../types';
import { sliceRecords } from './common';

describe('sliceRecords', () => {
  const records: AnkiRecord[] = [
    { id: 'id01', deckName: 'deck1', deckType: 'Basic', card1: 'card1', card2: 'card2', tags: ['tag1'] },
    { id: 'id02', deckName: 'deck1', deckType: 'Basic', card1: 'card1', card2: 'card2', tags: ['tag1'] },
    { id: 'id03', deckName: 'deck1', deckType: 'Basic', card1: 'card1', card2: 'card2', tags: ['tag1'] },
    { id: 'id04', deckName: 'deck1', deckType: 'Basic', card1: 'card1', card2: 'card2', tags: ['tag1'] },
    { id: 'id05', deckName: 'deck1', deckType: 'Basic', card1: 'card1', card2: 'card2', tags: ['tag1'] },
    { id: 'id06', deckName: 'deck1', deckType: 'Basic', card1: 'card1', card2: 'card2', tags: ['tag1'] },
    { id: 'id07', deckName: 'deck1', deckType: 'Basic', card1: 'card1', card2: 'card2', tags: ['tag1'] },
    { id: 'id08', deckName: 'deck1', deckType: 'Basic', card1: 'card1', card2: 'card2', tags: ['tag1'] },
    { id: 'id09', deckName: 'deck1', deckType: 'Basic', card1: 'card1', card2: 'card2', tags: ['tag1'] },
    { id: 'id10', deckName: 'deck1', deckType: 'Basic', card1: 'card1', card2: 'card2', tags: ['tag1'] },
  ];
  describe('omit is not defined', () => {
    it('should return first 5 records', () => {
      const result = sliceRecords(records, 5, undefined);
      expect(result).toEqual(records.slice(0, 5));
    });
    it('should handle limit greater than the number of records', () => {
      const result = sliceRecords(records, 100, undefined);
      expect(result).toEqual(records);
    });
  });
  describe('omit is defined', () => {
    it('should omit specified number of records', () => {
      const result = sliceRecords(records, 5, 3);
      expect(result).toEqual([
        { id: 'id04', deckName: 'deck1', deckType: 'Basic', card1: 'card1', card2: 'card2', tags: ['tag1'] },
        { id: 'id05', deckName: 'deck1', deckType: 'Basic', card1: 'card1', card2: 'card2', tags: ['tag1'] },
        { id: 'id06', deckName: 'deck1', deckType: 'Basic', card1: 'card1', card2: 'card2', tags: ['tag1'] },
        { id: 'id07', deckName: 'deck1', deckType: 'Basic', card1: 'card1', card2: 'card2', tags: ['tag1'] },
        { id: 'id08', deckName: 'deck1', deckType: 'Basic', card1: 'card1', card2: 'card2', tags: ['tag1'] },
      ]);
    });
    it('should return last limit records, if sum of omit and limit is greater than the number of records', () => {
      const result = sliceRecords(records, 5, 7);
      expect(result).toEqual([
        { id: 'id06', deckName: 'deck1', deckType: 'Basic', card1: 'card1', card2: 'card2', tags: ['tag1'] },
        { id: 'id07', deckName: 'deck1', deckType: 'Basic', card1: 'card1', card2: 'card2', tags: ['tag1'] },
        { id: 'id08', deckName: 'deck1', deckType: 'Basic', card1: 'card1', card2: 'card2', tags: ['tag1'] },
        { id: 'id09', deckName: 'deck1', deckType: 'Basic', card1: 'card1', card2: 'card2', tags: ['tag1'] },
        { id: 'id10', deckName: 'deck1', deckType: 'Basic', card1: 'card1', card2: 'card2', tags: ['tag1'] },
      ]);
    });
  });
});
