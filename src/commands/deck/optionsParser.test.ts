import { parse } from './optionsParser';

describe('parse', () => {
  it('should handle posibility that options are undefined', () => {
    const result = parse(undefined);
    expect(result).toBeUndefined();
  });
  it('should handle posibility that options are empty', () => {
    const result = parse({});
    expect(result).toBeUndefined();
  });
  describe('meaningSeparator', () => {
    it('should handle posibility that meaningSeparator is true, but value was not specified', () => {
      const options = { meaningSeparator: true };
      const result = parse(options);
      const expected = {
        meaningSeparator: ';;',
        countTags: false,
        countTagCombinations: false,
      };
      expect(result).toStrictEqual(expected);
    });
    it('should use provided meaningSeparator if it was specified', () => {
      const options = { meaningSeparator: '-' };
      const result = parse(options);
      const expected = {
        meaningSeparator: '-',
        countTags: false,
        countTagCombinations: false,
      };
      expect(result).toStrictEqual(expected);
    });
  });
  describe('synonymSeparator', () => {
    it('should handle posibility that synonymSeparator is true, but value was not specified', () => {
      const options = { synonymSeparator: true };
      const result = parse(options);
      const expected = {
        synonymSeparator: ',',
        countTags: false,
        countTagCombinations: false,
      };
      expect(result).toStrictEqual(expected);
    });
    it('should use provided synonymSeparator if it was specified', () => {
      const options = { synonymSeparator: ';' };
      const result = parse(options);
      const expected = {
        synonymSeparator: ';',
        countTags: false,
        countTagCombinations: false,
      };
      expect(result).toStrictEqual(expected);
    });
  });
  it('should use provided explanationBracket', () => {
    const options = { explanationBrackets: 'square' };
    const result = parse(options);
    const expected = {
      explanationBrackets: 'square',
      countTags: false,
      countTagCombinations: false,
    };
    expect(result).toStrictEqual(expected);
  });
  it('should set tags to true if it was specified', () => {
    const options = { countTags: true };
    const result = parse(options);
    const expected = {
      countTags: true,
      countTagCombinations: false,
    };
    expect(result).toStrictEqual(expected);
  });
  it('should set tagCombinations to true if it was specified', () => {
    const options = { countTagCombinations: true };
    const result = parse(options);
    const expected = {
      countTags: false,
      countTagCombinations: true,
    };
    expect(result).toStrictEqual(expected);
  });
  it('should set prefixSeparator if it was specified', () => {
    const options = { prefixSeparator: '-' };
    const result = parse(options);
    const expected = {
      prefixSeparator: '-',
      countTags: false,
      countTagCombinations: false,
    };
    expect(result).toStrictEqual(expected);
  });
});
