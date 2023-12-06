import { DEFAULT_MAX_ROW_COUNT, DEFAULT_MEANING_SEPARATOR } from '../../const';
import { parse } from './optionsParser';

describe('parse', () => {
  it('should use default meaning separator if no options are provided', () => {
    const result = parse(undefined);
    const expected = { meaningSeparator: DEFAULT_MEANING_SEPARATOR, maxRowCount: DEFAULT_MAX_ROW_COUNT };
    expect(result).toStrictEqual(expected);
  });
  it('should use prefix separator if is was provided', () => {
    const result = parse({ prefixSeparator: '##' });
    const expected = { meaningSeparator: ';;', prefixSeparator: '##', maxRowCount: 10, comparisionTable: undefined };
    expect(result).toStrictEqual(expected);
  });
  it('should use comparision table if is was provided', () => {
    const result = parse({ showComparisionTable: 'all' });
    const expected = { meaningSeparator: ';;', comparisionTable: 'all', maxRowCount: 10, prefixSeparator: undefined };
    expect(result).toStrictEqual(expected);
  });
  it('should use max rows if is was provided', () => {
    const result = parse({ maxRowCount: 5 });
    const expected = {
      meaningSeparator: ';;',
      maxRowCount: 5,
      prefixSeparator: undefined,
      comparisionTable: undefined,
    };
    expect(result).toStrictEqual(expected);
  });
});
