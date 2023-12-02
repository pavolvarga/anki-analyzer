import { parse } from './optionsParser';
import { VerifyCmdOptions } from './types';

describe('parseOptions', () => {
  it('should throw an error in case of no options', () => {
    expect(() => {
      parse(undefined);
    }).toThrow('One --verify-* option must be used.');
  });
  it('should thrown an error in case of missing --verify-* option', () => {
    expect(() => {
      parse({});
    }).toThrow('One --verify-* option must be used.');
  });
  it('should thrown an error in case of multiple --verify-* options', () => {
    expect(() => {
      parse({ verifyMeaningSeparatorUsed: 'card1', verifyMeaningSeparatorNotUsed: 'both' });
    }).toThrow('Only one --verify-* option can be used. But were used 2 options.');
  });
  it('should thrown an error in case of --verify-tags-used and --tags options used', () => {
    expect(() => {
      parse({ verifyTagsUsed: true, tags: 'verb' });
    }).toThrow('Option --verify-tags-used can not be used together with the --tags option.');
  });
  describe('should use default meaning separator', () => {
    it('when the --meaning-separator option is not used', () => {
      {
        const result = parse({ verifyMeaningSeparatorUsed: 'card1' });
        const expected: VerifyCmdOptions = {
          operation: 'verify-meaning-separator-used',
          operationArg: 'card1',
          meaningSeparator: ';;',
        };
        expect(result).toEqual(expected);
      }
    });
    it('when the --meaning-separator option is used without value', () => {
      const result = parse({ verifyMeaningSeparatorUsed: 'card1', meaningSeparator: true });
      const expected: VerifyCmdOptions = {
        operation: 'verify-meaning-separator-used',
        operationArg: 'card1',
        meaningSeparator: ';;',
      };
      expect(result).toEqual(expected);
    });
  });
  it('should use the specified meaning separator', () => {
    const result = parse({ verifyMeaningSeparatorUsed: 'card1', meaningSeparator: '|' });
    const expected: VerifyCmdOptions = {
      operation: 'verify-meaning-separator-used',
      operationArg: 'card1',
      meaningSeparator: '|',
    };
    expect(result).toEqual(expected);
  });
  it('should use the specified tags', () => {
    const result = parse({ tags: ['verb', 'noun'], verifyMeaningSeparatorUsed: 'card1' });
    const expected: VerifyCmdOptions = {
      meaningSeparator: ';;',
      tags: ['verb', 'noun'],
      operation: 'verify-meaning-separator-used',
      operationArg: 'card1',
    };
    expect(result).toEqual(expected);
  });
  it('should use provided argument for --verify-meaning-separator-used option', () => {
    const result = parse({ verifyMeaningSeparatorUsed: 'card2' });
    const expected: VerifyCmdOptions = {
      meaningSeparator: ';;',
      operation: 'verify-meaning-separator-used',
      operationArg: 'card2',
    };
    expect(result).toEqual(expected);
  });
  it('should use provided argument for --verify-meaning-separator-not used option', () => {
    const result = parse({ verifyMeaningSeparatorUsed: 'both' });
    const expected: VerifyCmdOptions = {
      meaningSeparator: ';;',
      operation: 'verify-meaning-separator-used',
      operationArg: 'both',
    };
    expect(result).toEqual(expected);
  });
});
