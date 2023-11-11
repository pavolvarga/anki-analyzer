import { InfoCmdOptions } from "./types";

const DEFAULT_MEANING_SEPARATOR = ';;';
const DEFAULT_SYNONYM_SEPARATOR = ',';

/**
 * If no options were used return undefined.
 * If an option or options were used then return an object either containing default values for options without argument 
 * or passed arguments as values.
 */
export function parse(options: any): InfoCmdOptions | undefined {
  if (options === undefined) {
    return undefined;
  }
  const result: InfoCmdOptions = {};
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
  return Object.values(result).length === 0 ? undefined : result;
}