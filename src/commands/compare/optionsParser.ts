import { DEFAULT_LIMIT_ROW_COUNT, DEFAULT_MEANING_SEPARATOR } from '../../const';
import { CompareCmdOptions } from './types';
import {
  parseOptionLimitRows,
  parseOptionMeaningSeparator,
  parseOptionOmitRows,
  parseOptionPrefixSeparator,
} from '../optionsParser';

export function parse(options: any): CompareCmdOptions {
  if (options === undefined) {
    return {
      meaningSeparator: DEFAULT_MEANING_SEPARATOR,
      prefixSeparator: undefined,
      comparisionTable: undefined,
      limitRowCount: DEFAULT_LIMIT_ROW_COUNT,
      omitRowCount: undefined,
      tagMarkers: undefined,
    };
  }

  return {
    meaningSeparator: parseOptionMeaningSeparator(options) ?? DEFAULT_MEANING_SEPARATOR,
    prefixSeparator: parseOptionPrefixSeparator(options),
    comparisionTable: options.showComparisionTable,
    limitRowCount: parseOptionLimitRows(options) ?? DEFAULT_LIMIT_ROW_COUNT,
    omitRowCount: parseOptionOmitRows(options),
    tagMarkers: options.tagMarkers,
  };
}
