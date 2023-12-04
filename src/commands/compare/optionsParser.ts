import { DEFAULT_MEANING_SEPARATOR } from '../const';
import { CompareCmdOptions } from './types';

export function parse(options: any): CompareCmdOptions {
  if (options === undefined) {
    return {
      meaningSeparator: DEFAULT_MEANING_SEPARATOR,
      maxRowCount: 10,
    };
  }

  return {
    meaningSeparator: options.meaningSeparator || DEFAULT_MEANING_SEPARATOR,
    prefixSeparator: options.prefixSeparator ? options.prefixSeparator : undefined,
    comparisionTable: options.showComparisionTable ? options.showComparisionTable : undefined,
    maxRowCount: options.maxRowCount ? options.maxRowCount : 10,
  };
}
