import { CompareCmdOptions } from './types';

export function parse(options: any): CompareCmdOptions {
  if (options === undefined) {
    return {
      meaningSeparator: ';;',
      maxRowCount: 10,
    };
  }

  return {
    meaningSeparator: options.meaningSeparator || ';;',
    prefixSeparator: options.prefixSeparator ? options.prefixSeparator : undefined,
    comparisionTable: options.showComparisionTable ? options.showComparisionTable : undefined,
    maxRowCount: options.maxRowCount ? options.maxRowCount : 10,
  };
}
