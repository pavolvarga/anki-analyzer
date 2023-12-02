import { CmdOptions } from './types';

const DEFAULT_MEANING_SEPARATOR = ';;';
const DEFAULT_SYNONYM_SEPARATOR = ',';

/**
 * If no options were used return undefined.
 * If an option or options were used then return an object either containing default values for options without argument
 * or passed arguments as values.
 */
export function parse(options: any): CmdOptions | undefined {
  if (options === undefined) {
    return undefined;
  }
  const result: CmdOptions = {};
  if (options.meaningSeparator === true) {
    result.meaningSeparator = DEFAULT_MEANING_SEPARATOR;
  }
  if (typeof options.meaningSeparator === 'string') {
    result.meaningSeparator = options.meaningSeparator;
  }
  if (options.synonymSeparator === true) {
    result.synonymSeparator = DEFAULT_SYNONYM_SEPARATOR;
  }
  if (typeof options.synonymSeparator === 'string') {
    result.synonymSeparator = options.synonymSeparator;
  }
  if (options.explanationBrackets) {
    result.explanationBracket = options.explanationBrackets;
  }
  return Object.values(result).length === 0 ? undefined : result;
}

/**
 * If options do not exist then return default options.
 */
export function useDefaults(options: CmdOptions | undefined): CmdOptions {
  if (options) {
    return options;
  }
  return {
    meaningSeparator: DEFAULT_MEANING_SEPARATOR,
    synonymSeparator: DEFAULT_SYNONYM_SEPARATOR,
  };
}
