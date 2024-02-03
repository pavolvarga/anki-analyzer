import { DEFAULT_LIMIT_ROW_COUNT, DEFAULT_MEANING_SEPARATOR, DEFAULT_SYNONYM_SEPARATOR } from '../../const';
import { CompareCmdOptions } from './types';
import {
  parseOptionDuplicitMarkers,
  parseOptionLimitRows,
  parseOptionMeaningSeparator,
  parseOptionOmitRows,
  parseOptionPrefixSeparator,
  parseOptionSynonymSeparator,
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
      duplicitMarkers: undefined,
      synonymSeparator: DEFAULT_SYNONYM_SEPARATOR,
    };
  }

  return {
    meaningSeparator: parseOptionMeaningSeparator(options) ?? DEFAULT_MEANING_SEPARATOR,
    synonymSeparator: parseOptionSynonymSeparator(options) ?? DEFAULT_SYNONYM_SEPARATOR,
    prefixSeparator: parseOptionPrefixSeparator(options),
    comparisionTable: options.showComparisionTable,
    limitRowCount: parseOptionLimitRows(options) ?? DEFAULT_LIMIT_ROW_COUNT,
    omitRowCount: parseOptionOmitRows(options),
    tagMarkers: options.tagMarkers,
    duplicitMarkers: parseOptionDuplicitMarkers(options),
  };
}
