import { parse } from './optionsParser';
import { ListCmdOptions } from './types';

describe('parse', () => {
  it('should throw an error if options are not specified', () => {
    expect(() => parse(undefined)).toThrow('At least one --list* option must be specified');
  });
  it('should throw an error if no list* option is specified', () => {
    expect(() => parse({ maxRowCount: 100 })).toThrow('At least one --list* option must be specified');
  });
  it('should throw an error if --list-cards-with-prefix-separator is specified but --prefix-separator is not specified', () => {
    expect(() => parse({ listCardsWithPrefixSeparator: true })).toThrow(
      '--prefix-separator must be specified when --list-cards-with-prefix-separator is specified',
    );
  });
  describe('meaningSeparator', () => {
    it('should use default meaningSeparator if not specified', () => {
      const result = parse({ limitRows: 100, listCardsWithMeaningSeparator: true });
      const expected: ListCmdOptions = {
        meaningSeparator: ';;',
        synonymSeparator: ',',
        explanationBrackets: 'round',
        tags: undefined,
        cardType: 'both',
        limitRowCount: 100,
        operations: ['--list-cards-with-meaning-separator'],
        prefixSeparator: undefined,
      };
      expect(result).toStrictEqual(expected);
    });
    it('should use specified meaningSeparator', () => {
      const result = parse({ limitRows: 100, listCardsWithMeaningSeparator: true, meaningSeparator: '||' });
      const expected: ListCmdOptions = {
        meaningSeparator: '||',
        synonymSeparator: ',',
        explanationBrackets: 'round',
        tags: undefined,
        cardType: 'both',
        limitRowCount: 100,
        operations: ['--list-cards-with-meaning-separator'],
        prefixSeparator: undefined,
      };
      expect(result).toStrictEqual(expected);
    });
  });
  describe('synonymSeparator', () => {
    it('should use default synonymSeparator if not specified', () => {
      const result = parse({ limitRows: 100, listCardsWithSynonymSeparator: true });
      const expected: ListCmdOptions = {
        meaningSeparator: ';;',
        synonymSeparator: ',',
        explanationBrackets: 'round',
        tags: undefined,
        cardType: 'both',
        limitRowCount: 100,
        operations: ['--list-cards-with-synonym-separator'],
        prefixSeparator: undefined,
      };
      expect(result).toStrictEqual(expected);
    });
    it('should use specified synonymSeparator', () => {
      const result = parse({ limitRows: 100, listCardsWithSynonymSeparator: true, synonymSeparator: '||' });
      const expected: ListCmdOptions = {
        meaningSeparator: ';;',
        synonymSeparator: '||',
        explanationBrackets: 'round',
        tags: undefined,
        cardType: 'both',
        limitRowCount: 100,
        operations: ['--list-cards-with-synonym-separator'],
        prefixSeparator: undefined,
      };
      expect(result).toStrictEqual(expected);
    });
  });
  describe('explanationBrackets', () => {
    it('should use default explanationBrackets if not specified', () => {
      const result = parse({ limitRows: 100, listCardsWithExplanationBrackets: true });
      const expected: ListCmdOptions = {
        meaningSeparator: ';;',
        synonymSeparator: ',',
        explanationBrackets: 'round',
        tags: undefined,
        cardType: 'both',
        limitRowCount: 100,
        operations: ['--list-cards-with-explanation-brackets'],
        prefixSeparator: undefined,
      };
      expect(result).toStrictEqual(expected);
    });
    it('should use specified explanationBrackets', () => {
      const result = parse({ limitRows: 100, listCardsWithExplanationBrackets: true, explanationBracket: 'square' });
      const expected: ListCmdOptions = {
        meaningSeparator: ';;',
        synonymSeparator: ',',
        explanationBrackets: 'square',
        tags: undefined,
        cardType: 'both',
        limitRowCount: 100,
        operations: ['--list-cards-with-explanation-brackets'],
        prefixSeparator: undefined,
      };
      expect(result).toStrictEqual(expected);
    });
  });
  describe('tags', () => {
    it('should not use tags if not specified', () => {
      const result = parse({ limitRows: 100, listCardsWithMeaningSeparator: true });
      const expected: ListCmdOptions = {
        meaningSeparator: ';;',
        synonymSeparator: ',',
        explanationBrackets: 'round',
        tags: undefined,
        cardType: 'both',
        limitRowCount: 100,
        operations: ['--list-cards-with-meaning-separator'],
        prefixSeparator: undefined,
      };
      expect(result).toStrictEqual(expected);
    });
    it('should use specified tags', () => {
      const result = parse({ limitRows: 100, listCardsWithMeaningSeparator: true, tags: ['noun', 'verb'] });
      const expected: ListCmdOptions = {
        meaningSeparator: ';;',
        synonymSeparator: ',',
        explanationBrackets: 'round',
        tags: ['noun', 'verb'],
        cardType: 'both',
        limitRowCount: 100,
        operations: ['--list-cards-with-meaning-separator'],
        prefixSeparator: undefined,
      };
      expect(result).toStrictEqual(expected);
    });
  });
  describe('cardType', () => {
    it('should use default cardType if not specified', () => {
      const result = parse({ limitRows: 100, listCardsWithMeaningSeparator: true });
      const expected: ListCmdOptions = {
        meaningSeparator: ';;',
        synonymSeparator: ',',
        explanationBrackets: 'round',
        tags: undefined,
        cardType: 'both',
        limitRowCount: 100,
        operations: ['--list-cards-with-meaning-separator'],
        prefixSeparator: undefined,
      };
      expect(result).toStrictEqual(expected);
    });
    it('should use specified cardType', () => {
      const result = parse({ limitRows: 100, listCardsWithMeaningSeparator: true, card: 'card1' });
      const expected: ListCmdOptions = {
        meaningSeparator: ';;',
        synonymSeparator: ',',
        explanationBrackets: 'round',
        tags: undefined,
        cardType: 'card1',
        limitRowCount: 100,
        operations: ['--list-cards-with-meaning-separator'],
        prefixSeparator: undefined,
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
        limitRowCount: 10,
        operations: ['--list-cards-with-meaning-separator'],
        prefixSeparator: undefined,
      };
      expect(result).toStrictEqual(expected);
    });
    it('should use specified maxRowCount', () => {
      const result = parse({ listCardsWithMeaningSeparator: true, limitRows: 200 });
      const expected: ListCmdOptions = {
        meaningSeparator: ';;',
        synonymSeparator: ',',
        explanationBrackets: 'round',
        tags: undefined,
        cardType: 'both',
        limitRowCount: 200,
        operations: ['--list-cards-with-meaning-separator'],
        prefixSeparator: undefined,
      };
      expect(result).toStrictEqual(expected);
    });
  });
  it('should use all specified operations', () => {
    const result = parse({
      limitRows: 100,
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
      limitRowCount: 100,
      operations: [
        '--list-cards-with-meaning-separator',
        '--list-cards-with-synonym-separator',
        '--list-cards-with-explanation-brackets',
      ],
      prefixSeparator: undefined,
    };
    expect(result).toStrictEqual(expected);
  });
  it('should use specified prefixSeparator', () => {
    const result = parse({
      limitRows: 100,
      listCardsWithMeaningSeparator: true,
      prefixSeparator: '/',
    });
    const expected: ListCmdOptions = {
      meaningSeparator: ';;',
      synonymSeparator: ',',
      explanationBrackets: 'round',
      tags: undefined,
      cardType: 'both',
      limitRowCount: 100,
      operations: ['--list-cards-with-meaning-separator'],
      prefixSeparator: '/',
    };
    expect(result).toStrictEqual(expected);
  });
});
