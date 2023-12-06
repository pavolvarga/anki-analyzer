import { DEFAULT_MAX_ROW_COUNT, DEFAULT_SYNONYM_SEPARATOR } from '../../const';
import { parse } from './optionsParser';

describe('parse', () => {
  it('should return default options when no options are passed', () => {
    const options = undefined;
    const expected = {
      synonymSeparator: DEFAULT_SYNONYM_SEPARATOR,
      tags: undefined,
      cardType: undefined,
      maxRowCount: DEFAULT_MAX_ROW_COUNT,
    };

    expect(parse(options)).toEqual(expected);
  });
  it('should use passed synonym separator if is was provided', () => {
    const options = { synonymSeparator: '##' };
    const expected = {
      synonymSeparator: '##',
      tags: undefined,
      cardType: undefined,
      maxRowCount: DEFAULT_MAX_ROW_COUNT,
    };

    expect(parse(options)).toEqual(expected);
  });
  it('should use passed max row count if is was provided', () => {
    const options = { maxRowCount: 5 };
    const expected = {
      synonymSeparator: DEFAULT_SYNONYM_SEPARATOR,
      tags: undefined,
      cardType: undefined,
      maxRowCount: 5,
    };

    expect(parse(options)).toEqual(expected);
  });
  it('should use passed tags they were provided provided', () => {
    const options = { tags: ['tag1', 'tag2'] };
    const expected = {
      synonymSeparator: DEFAULT_SYNONYM_SEPARATOR,
      tags: ['tag1', 'tag2'],
      cardType: undefined,
      maxRowCount: DEFAULT_MAX_ROW_COUNT,
    };

    expect(parse(options)).toEqual(expected);
  });
  it('should use passed card type if is was provided', () => {
    const options = { showDuplicatesTable: 'card2' };
    const expected = {
      synonymSeparator: DEFAULT_SYNONYM_SEPARATOR,
      tags: undefined,
      cardType: 'card2',
      maxRowCount: DEFAULT_MAX_ROW_COUNT,
    };

    expect(parse(options)).toEqual(expected);
  });
});
