import { DEFAULT_LIMIT_ROW_COUNT, DEFAULT_MEANING_SEPARATOR } from '../../const';
import { CompareCmdOptions } from './types';
import { parseOptionLimitRows, parseOptionOmitRows, parsePrefixSeparator } from '../optionsParser';

export function parse(options: any): CompareCmdOptions {
  if (options === undefined) {
    return {
      meaningSeparator: DEFAULT_MEANING_SEPARATOR,
      prefixSeparator: undefined,
      comparisionTable: undefined,
      limitRowCount: DEFAULT_LIMIT_ROW_COUNT,
      omitRowCount: undefined,
    };
  }

  return {
    meaningSeparator: options.meaningSeparator || DEFAULT_MEANING_SEPARATOR,
    prefixSeparator: parsePrefixSeparator(options),
    comparisionTable: options.showComparisionTable ? options.showComparisionTable : undefined,
    limitRowCount: parseOptionLimitRows(options) ?? DEFAULT_LIMIT_ROW_COUNT,
    omitRowCount: parseOptionOmitRows(options),
  };
}
