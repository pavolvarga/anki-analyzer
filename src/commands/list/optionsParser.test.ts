import { parse } from './optionsParser';
import { ListCmdOptions } from './types';

describe('parse', () => {
  it('should throw an error if options are not specified', () => {
    expect(() => parse(undefined)).toThrow('At least one --list* option must be specified');
  });
  it('should throw an error if no list* option is specified', () => {
    expect(() => parse({ maxRowCount: 100 })).toThrow('At least one --list* option must be specified');
  });
  describe('meaningSeparator', () => {
    it('should use default meaningSeparator if not specified', () => {
      const result = parse({ maxRowCount: 100, listCardsWithMeaningSeparator: true });
      const expected: ListCmdOptions = {
        meaningSeparator: ';;',
        synonymSeparator: ',',
        explanationBrackets: 'round',
        tags: undefined,
        cardType: 'both',
        maxRowCount: 100,
        operations: ['--list-cards-with-meaning-separator'],
      };
      expect(result).toStrictEqual(expected);
    });
    it('should use specified meaningSeparator', () => {
      const result = parse({ maxRowCount: 100, listCardsWithMeaningSeparator: true, meaningSeparator: '||' });
      const expected: ListCmdOptions = {
        meaningSeparator: '||',
        synonymSeparator: ',',
        explanationBrackets: 'round',
        tags: undefined,
        cardType: 'both',
        maxRowCount: 100,
        operations: ['--list-cards-with-meaning-separator'],
      };
      expect(result).toStrictEqual(expected);
    });
  });
  describe('synonymSeparator', () => {
    it('should use default synonymSeparator if not specified', () => {
      const result = parse({ maxRowCount: 100, listCardsWithSynonymSeparator: true });
      const expected: ListCmdOptions = {
        meaningSeparator: ';;',
        synonymSeparator: ',',
        explanationBrackets: 'round',
        tags: undefined,
        cardType: 'both',
        maxRowCount: 100,
        operations: ['--list-cards-with-synonym-separator'],
      };
      expect(result).toStrictEqual(expected);
    });
    it('should use specified synonymSeparator', () => {
      const result = parse({ maxRowCount: 100, listCardsWithSynonymSeparator: true, synonymSeparator: '||' });
      const expected: ListCmdOptions = {
        meaningSeparator: ';;',
        synonymSeparator: '||',
        explanationBrackets: 'round',
        tags: undefined,
        cardType: 'both',
        maxRowCount: 100,
        operations: ['--list-cards-with-synonym-separator'],
      };
      expect(result).toStrictEqual(expected);
    });
  });
  describe('explanationBrackets', () => {
    it('should use default explanationBrackets if not specified', () => {
      const result = parse({ maxRowCount: 100, listCardsWithExplanationBrackets: true });
      const expected: ListCmdOptions = {
        meaningSeparator: ';;',
        synonymSeparator: ',',
        explanationBrackets: 'round',
        tags: undefined,
        cardType: 'both',
        maxRowCount: 100,
        operations: ['--list-cards-with-explanation-brackets'],
      };
      expect(result).toStrictEqual(expected);
    });
    it('should use specified explanationBrackets', () => {
      const result = parse({ maxRowCount: 100, listCardsWithExplanationBrackets: true, explanationBracket: 'square' });
      const expected: ListCmdOptions = {
        meaningSeparator: ';;',
        synonymSeparator: ',',
        explanationBrackets: 'square',
        tags: undefined,
        cardType: 'both',
        maxRowCount: 100,
        operations: ['--list-cards-with-explanation-brackets'],
      };
      expect(result).toStrictEqual(expected);
    });
  });
  describe('tags', () => {
    it('should not use tags if not specified', () => {
      const result = parse({ maxRowCount: 100, listCardsWithMeaningSeparator: true });
      const expected: ListCmdOptions = {
        meaningSeparator: ';;',
        synonymSeparator: ',',
        explanationBrackets: 'round',
        tags: undefined,
        cardType: 'both',
        maxRowCount: 100,
        operations: ['--list-cards-with-meaning-separator'],
      };
      expect(result).toStrictEqual(expected);
    });
    it('should use specified tags', () => {
      const result = parse({ maxRowCount: 100, listCardsWithMeaningSeparator: true, tags: ['noun', 'verb'] });
      const expected: ListCmdOptions = {
        meaningSeparator: ';;',
        synonymSeparator: ',',
        explanationBrackets: 'round',
        tags: ['noun', 'verb'],
        cardType: 'both',
        maxRowCount: 100,
        operations: ['--list-cards-with-meaning-separator'],
      };
      expect(result).toStrictEqual(expected);
    });
  });
  describe('cardType', () => {
    it('should use default cardType if not specified', () => {
      const result = parse({ maxRowCount: 100, listCardsWithMeaningSeparator: true });
      const expected: ListCmdOptions = {
        meaningSeparator: ';;',
        synonymSeparator: ',',
        explanationBrackets: 'round',
        tags: undefined,
        cardType: 'both',
        maxRowCount: 100,
        operations: ['--list-cards-with-meaning-separator'],
      };
      expect(result).toStrictEqual(expected);
    });
    it('should use specified cardType', () => {
      const result = parse({ maxRowCount: 100, listCardsWithMeaningSeparator: true, cardType: 'card1' });
      const expected: ListCmdOptions = {
        meaningSeparator: ';;',
        synonymSeparator: ',',
        explanationBrackets: 'round',
        tags: undefined,
        cardType: 'card1',
        maxRowCount: 100,
        operations: ['--list-cards-with-meaning-separator'],
      };
      expect(result).toStrictEqual(expected);
    });
  });
  describe('maxRowCount', () => {
    it('should use default maxRowCount if not specified', () => {
      const result = parse({ listCardsWithMeaningSeparator: true });
      const expected: ListCmdOptions = {
        meaningSeparator: ';;',
        synonymSeparator: ',',
        explanationBrackets: 'round',
        tags: undefined,
        cardType: 'both',
        maxRowCount: 10,
        operations: ['--list-cards-with-meaning-separator'],
      };
      expect(result).toStrictEqual(expected);
    });
    it('should use specified maxRowCount', () => {
      const result = parse({ listCardsWithMeaningSeparator: true, maxRowCount: 200 });
      const expected: ListCmdOptions = {
        meaningSeparator: ';;',
        synonymSeparator: ',',
        explanationBrackets: 'round',
        tags: undefined,
        cardType: 'both',
        maxRowCount: 200,
        operations: ['--list-cards-with-meaning-separator'],
      };
      expect(result).toStrictEqual(expected);
    });
  });
  it('should use all specified operations', () => {
    const result = parse({
      maxRowCount: 100,
      listCardsWithMeaningSeparator: true,
      listCardsWithSynonymSeparator: true,
      listCardsWithExplanationBrackets: true,
    });
    const expected: ListCmdOptions = {
      meaningSeparator: ';;',
      synonymSeparator: ',',
      explanationBrackets: 'round',
      tags: undefined,
      cardType: 'both',
      maxRowCount: 100,
      operations: [
        '--list-cards-with-meaning-separator',
        '--list-cards-with-synonym-separator',
        '--list-cards-with-explanation-brackets',
      ],
    };
    expect(result).toStrictEqual(expected);
  });
});
