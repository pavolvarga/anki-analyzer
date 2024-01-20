import { removePrefixSeparator } from './normalization';

describe('removePrefixSeparator', () => {
  it('should not change card except for trimming, if prefix separator is not specified', () => {
    const result = removePrefixSeparator(' auf-nehmen ');
    expect(result).toStrictEqual('auf-nehmen');
  });
  it('should remove prefix separator if was specified', () => {
    const result = removePrefixSeparator(' auf-nehmen ', '-');
    expect(result).toStrictEqual('aufnehmen');
  });
  it('should remove all occurences of prefix separator if was specified and it is used multiple times in the card', () => {
    const result = removePrefixSeparator(' wieder-auf-nehmen ', '-');
    expect(result).toStrictEqual('wiederaufnehmen');
  });
});
