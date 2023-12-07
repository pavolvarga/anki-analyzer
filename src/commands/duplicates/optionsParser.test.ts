import { DEFAULT_LIMIT_ROW_COUNT, DEFAULT_SYNONYM_SEPARATOR } from '../../const';
import { parse } from './optionsParser';

describe('parse', () => {
  it('should return default options when no options are passed', () => {
    const options = undefined;
    const expected = {
      synonymSeparator: DEFAULT_SYNONYM_SEPARATOR,
      tags: undefined,
      cardType: undefined,
      limitRowCount: DEFAULT_LIMIT_ROW_COUNT,
    };

    expect(parse(options)).toEqual(expected);
  });
  it('should use passed synonym separator if is was provided', () => {
    const options = { synonymSeparator: '##' };
    const expected = {
      synonymSeparator: '##',
      tags: undefined,
      cardType: undefined,
      limitRowCount: DEFAULT_LIMIT_ROW_COUNT,
    };

    expect(parse(options)).toEqual(expected);
  });
  it('should use passed limit row count if is was provided', () => {
    const options = { limitRows: 5 };
    const expected = {
      synonymSeparator: DEFAULT_SYNONYM_SEPARATOR,
      tags: undefined,
      cardType: undefined,
      limitRowCount: 5,
    };

    expect(parse(options)).toEqual(expected);
  });
  it('should use passed tags they were provided provided', () => {
    const options = { tags: ['tag1', 'tag2'] };
    const expected = {
      synonymSeparator: DEFAULT_SYNONYM_SEPARATOR,
      tags: ['tag1', 'tag2'],
      cardType: undefined,
      limitRowCount: DEFAULT_LIMIT_ROW_COUNT,
    };

    expect(parse(options)).toEqual(expected);
  });
  it('should use passed card type if is was provided', () => {
    const options = { showDuplicatesTable: 'card2' };
    const expected = {
      synonymSeparator: DEFAULT_SYNONYM_SEPARATOR,
      tags: undefined,
      cardType: 'card2',
      limitRowCount: DEFAULT_LIMIT_ROW_COUNT,
    };

    expect(parse(options)).toEqual(expected);
  });
  it('should specified omit row count if is was provided', () => {
    const options = { omitRows: 5 };
    const expected = {
      synonymSeparator: DEFAULT_SYNONYM_SEPARATOR,
      tags: undefined,
      cardType: undefined,
      limitRowCount: DEFAULT_LIMIT_ROW_COUNT,
      omitRowCount: 5,
    };

    expect(parse(options)).toEqual(expected);
  });
});
