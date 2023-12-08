import { DEFAULT_LIMIT_ROW_COUNT, DEFAULT_MEANING_SEPARATOR } from '../../const';
import { CompareCmdOptions } from './types';
import { parseOptionLimitRows, parseOptionOmitRows } from '../optionsParser';

export function parse(options: any): CompareCmdOptions {
  if (options === undefined) {
    return {
      meaningSeparator: DEFAULT_MEANING_SEPARATOR,
      limitRowCount: DEFAULT_LIMIT_ROW_COUNT,
      prefixSeparator: undefined,
    };
  }

  const limitRowCount = parseOptionLimitRows(options);
  const omitRowCount = parseOptionOmitRows(options);

  return {
    meaningSeparator: options.meaningSeparator || DEFAULT_MEANING_SEPARATOR,
    prefixSeparator: options.prefixSeparator ? options.prefixSeparator : undefined,
    comparisionTable: options.showComparisionTable ? options.showComparisionTable : undefined,
    omitRowCount,
    limitRowCount: limitRowCount === undefined ? DEFAULT_LIMIT_ROW_COUNT : limitRowCount,
  };
}
