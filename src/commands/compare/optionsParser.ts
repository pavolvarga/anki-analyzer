import { CompareCmdOptions } from './types';

export function parse(options: any): CompareCmdOptions {
  if (options === undefined) {
    return {
      meaningSeparator: ';;',
      prefixSeparator: undefined,
    };
  }

  return {
    meaningSeparator: options.meaningSeparator || ';;',
    prefixSeparator: options.prefixSeparator ? options.prefixSeparator : undefined,
  };
}
