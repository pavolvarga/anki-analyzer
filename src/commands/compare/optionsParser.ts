import { DEFAULT_LIMIT_ROW_COUNT, DEFAULT_MEANING_SEPARATOR } from '../../const';
import { CompareCmdOptions } from './types';

export function parse(options: any): CompareCmdOptions {
  if (options === undefined) {
    return {
      meaningSeparator: DEFAULT_MEANING_SEPARATOR,
      limitRowCount: DEFAULT_LIMIT_ROW_COUNT,
    };
  }

  return {
    meaningSeparator: options.meaningSeparator || DEFAULT_MEANING_SEPARATOR,
    prefixSeparator: options.prefixSeparator ? options.prefixSeparator : undefined,
    comparisionTable: options.showComparisionTable ? options.showComparisionTable : undefined,
    limitRowCount: options.limitRows ? options.limitRows : DEFAULT_LIMIT_ROW_COUNT,
  };
}
