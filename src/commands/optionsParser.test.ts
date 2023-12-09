import {
  parseOptionExplanationBrackets,
  parseOptionLimitRows,
  parseOptionMeaningSeparator,
  parseOptionOmitRows,
  parseOptionPrefixSeparator,
  parseOptionSynonymSeparator,
  parseOptionTags,
} from './optionsParser';

describe('parseOptionLimitRows', () => {
  it('returns undefined if options is undefined', () => {
    expect(parseOptionLimitRows(undefined)).toBeUndefined();
  });
  it('returns undefined if options.limitRows is undefined', () => {
    expect(parseOptionLimitRows({})).toBeUndefined();
  });
  it('throws an error if options.limitRows is not a number', () => {
    expect(() => parseOptionLimitRows({ limitRows: 'string' })).toThrow(
      'Expected --limit-rows to be a number, but got string',
    );
  });
  it('returns options.limitRows if it is a number', () => {
    expect(parseOptionLimitRows({ limitRows: 50 })).toStrictEqual(50);
  });
  it('returns options.limitRows if it is a stringified number', () => {
    expect(parseOptionLimitRows({ limitRows: '50' })).toStrictEqual(50);
  });
});

describe('parseOptionOmitRows', () => {
  it('returns undefined if options is undefined', () => {
    expect(parseOptionOmitRows(undefined)).toBeUndefined();
  });
  it('returns undefined if options.omitRows is undefined', () => {
    expect(parseOptionOmitRows({})).toBeUndefined();
  });
  it('throws an error if options.omitRows is not a number', () => {
    expect(() => parseOptionOmitRows({ omitRows: 'string' })).toThrow(
      'Expected --omit-rows to be a number, but got string',
    );
  });
  it('returns options.omitRows if it is a number', () => {
    expect(parseOptionOmitRows({ omitRows: 50 })).toStrictEqual(50);
  });
  it('returns options.omitRows if it is a stringified number', () => {
    expect(parseOptionOmitRows({ omitRows: '50' })).toStrictEqual(50);
  });
});

describe('parseOptionTags', () => {
  it('returns undefined if options is undefined', () => {
    expect(parseOptionTags(undefined)).toBeUndefined();
  });
  it('returns undefined if options.tags is undefined', () => {
    expect(parseOptionTags({})).toBeUndefined();
  });
  it('throws an error if options.tags is not a string or array', () => {
    expect(() => parseOptionTags({ tags: 10 })).toThrow('Expected --tags to be a single string or array of string');
  });
  it('returns [options.tags] if options.tags is a string', () => {
    expect(parseOptionTags({ tags: 'tag' })).toStrictEqual(['tag']);
  });
  it('returns options.tags if it is an array', () => {
    expect(parseOptionTags({ tags: ['tag1', 'tag2'] })).toStrictEqual(['tag1', 'tag2']);
  });
});

describe('parseOptionPrefixSeparator', () => {
  it('returns options.prefixSeparator', () => {
    expect(parseOptionPrefixSeparator({ prefixSeparator: '-' })).toStrictEqual('-');
  });
});

describe('parseOptionMeaningSeparator', () => {
  it('returns undefined if options is undefined', () => {
    expect(parseOptionMeaningSeparator(undefined)).toBeUndefined();
  });
  it('returns undefined if options.meaningSeparator is undefined', () => {
    expect(parseOptionMeaningSeparator({})).toBeUndefined();
  });
  it('throws an error if options.meaningSeparator is not a string', () => {
    expect(() => parseOptionMeaningSeparator({ meaningSeparator: 10 })).toThrow(
      'Expected --meaning-separator to be a string, but got number',
    );
  });
  it('returns options.meaningSeparator if it is a string', () => {
    expect(parseOptionMeaningSeparator({ meaningSeparator: '-' })).toStrictEqual('-');
  });
  it('returns default value for options.meaningSeparator if the option --meaning-separator is specified without a value', () => {
    expect(parseOptionMeaningSeparator({ meaningSeparator: true })).toStrictEqual(';;');
  });
});

describe('parseOptionSynonymSeparator', () => {
  it('returns undefined if options is undefined', () => {
    expect(parseOptionSynonymSeparator(undefined)).toBeUndefined();
  });
  it('returns undefined if options.synonymSeparator is undefined', () => {
    expect(parseOptionSynonymSeparator({})).toBeUndefined();
  });
  it('throws an error if options.synonymSeparator is not a string', () => {
    expect(() => parseOptionSynonymSeparator({ synonymSeparator: 10 })).toThrow(
      'Expected --synonym-separator to be a string, but got number',
    );
  });
  it('returns options.synonymSeparator if it is a string', () => {
    expect(parseOptionSynonymSeparator({ synonymSeparator: '-' })).toStrictEqual('-');
  });
  it('returns default value for options.synonymSeparator if the option --synonym-separator is specified without a value', () => {
    expect(parseOptionSynonymSeparator({ synonymSeparator: true })).toStrictEqual(',');
  });
});

describe('parseExplanationBracket', () => {
  it('returns options.explanationBracket', () => {
    expect(parseOptionExplanationBrackets({ explanationBracket: 'square' })).toStrictEqual('square');
  });
});
