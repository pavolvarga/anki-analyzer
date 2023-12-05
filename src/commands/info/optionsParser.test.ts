import { parse } from './optionsParser';

describe('parse', () => {
  it('handles posibility that there are no cmd options', () => {
    const result = parse(undefined);
    expect(result).toBeUndefined();
  });
  it('handles empty cmd options', () => {
    const result = parse({});
    expect(result).toBeUndefined();
  });
  it('handles option for meaning separator without specified value', () => {
    const options = { meaningSeparator: true };
    const result = parse(options);
    expect(result).toStrictEqual({ meaningSeparator: ';;' });
  });
  it('handles option for meaning separator with specified value', () => {
    const options = { meaningSeparator: '-' };
    const result = parse(options);
    expect(result).toStrictEqual({ meaningSeparator: '-' });
  });
  it('handles option for synonym separator without specified value', () => {
    const options = { synonymSeparator: true };
    const result = parse(options);
    expect(result).toStrictEqual({ synonymSeparator: ',' });
  });
  it('handles option for synonym separator with specified value', () => {
    const options = { synonymSeparator: '-' };
    const result = parse(options);
    expect(result).toStrictEqual({ synonymSeparator: '-' });
  });
  it('handles option for explanantion bracket with mandatory choice argument', () => {
    const options = { explanationBrackets: 'round' };
    const result = parse(options);
    expect(result).toStrictEqual({ explanationBrackets: 'round' });
  });
});
