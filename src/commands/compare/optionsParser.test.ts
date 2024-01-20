import { DEFAULT_LIMIT_ROW_COUNT, DEFAULT_MEANING_SEPARATOR } from '../../const';
import { parse } from './optionsParser';

describe('parse', () => {
  it('should use default meaning separator if no options are provided', () => {
    const result = parse(undefined);
    const expected = {
      meaningSeparator: DEFAULT_MEANING_SEPARATOR,
      limitRowCount: DEFAULT_LIMIT_ROW_COUNT,
      prefixSeparator: undefined,
      comparisionTable: undefined,
      omitRowCount: undefined,
      tagMarkers: undefined,
    };
    expect(result).toStrictEqual(expected);
  });
  it('should use prefix separator if is was provided', () => {
    const result = parse({ prefixSeparator: '##' });
    const expected = {
      meaningSeparator: ';;',
      prefixSeparator: '##',
      limitRowCount: 10,
      comparisionTable: undefined,
      omitRowCount: undefined,
      tagMarkers: undefined,
    };
    expect(result).toStrictEqual(expected);
  });
  it('should use comparision table if is was provided', () => {
    const result = parse({ showComparisionTable: 'all' });
    const expected = {
      meaningSeparator: ';;',
      comparisionTable: 'all',
      limitRowCount: 10,
      prefixSeparator: undefined,
      omitRowCount: undefined,
      tagMarkers: undefined,
    };
    expect(result).toStrictEqual(expected);
  });
  it('should use limit row count if is was provided', () => {
    const result = parse({ limitRows: 5 });
    const expected = {
      meaningSeparator: ';;',
      limitRowCount: 5,
      prefixSeparator: undefined,
      comparisionTable: undefined,
      omitRowCount: undefined,
      tagMarkers: undefined,
    };
    expect(result).toStrictEqual(expected);
  });
  it('should use omit row count if is was provided', () => {
    const result = parse({ omitRows: 5 });
    const expected = {
      meaningSeparator: ';;',
      limitRowCount: 10,
      prefixSeparator: undefined,
      comparisionTable: undefined,
      omitRowCount: 5,
      tagMarkers: undefined,
    };
    expect(result).toStrictEqual(expected);
  });
  it('should use tag markers if they were provided', () => {
    const result = parse({ tagMarkers: ['(verb)', '(noun)'] });
    const expected = {
      meaningSeparator: ';;',
      limitRowCount: 10,
      prefixSeparator: undefined,
      comparisionTable: undefined,
      omitRowCount: undefined,
      tagMarkers: ['(verb)', '(noun)'],
    };
    expect(result).toStrictEqual(expected);
  });
});
